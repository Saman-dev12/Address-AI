import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import axios from "axios";
import { db } from "@/db/drizzle";
import { companyTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const address_model_url = process.env.PYTHON_SERVER_URL;

export type OutputAddress = {
  corrected_address: string;
  original_address: string;
  predicted_pincode: number | null;
  spelling_corrections: Record<string, string>;
  status: string;
};

const app = new Hono().post(
  "/bulk-address",
  zValidator(
    "json",
    z.object({
      addresses: z.string().array().min(1),
    })
  ),
  zValidator(
    "param",
    z.object({
      email: z.string().email(),
    })
  ),
  async (c) => {
    const addresses = c.req.valid("json").addresses;
    const email = c.req.valid("param").email;
    // console.log(addresses);

    let corrected_addresses: OutputAddress[] = [];

    const [user] = await db
      .select()
      .from(companyTable)
      .where(eq(companyTable.email, email));

    if (!user) {
      return c.json({ error: "Unauthorized User" }, 404);
    }

    try {
      const res = await axios.post(
        `${address_model_url}/bulk_process_addresses`,
        { addresses }
      );
      corrected_addresses = res.data.data;
    } catch (err) {
      console.log("BULK_ADDRESS[POST]:", err);
      return c.json({ error: "Internal Server Error" }, 500);
    }

    if (corrected_addresses.length <= 0) {
      console.log(corrected_addresses.length);
      return c.json({ error: "Internal Server Error" }, 500);
    }

    return c.json(
      {
        data: corrected_addresses,
      },
      200
    );
  }
);

export default app;
