import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { companyTable, totalVerifiedAddressTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().get(
  "/",
  zValidator(
    "param",
    z.object({
      email: z.string().email(),
    })
  ),
  async (c) => {
    const email = c.req.valid("param").email;

    const [company] = await db
      .select()
      .from(companyTable)
      .where(eq(companyTable.email, email));

    if (!company) {
      return c.json({ error: "Company not found" }, 404);
    }

    const totalVerifiedAddresses = await db
      .select()
      .from(totalVerifiedAddressTable)
      .where(eq(totalVerifiedAddressTable.companyId, company.id))
      .orderBy(totalVerifiedAddressTable.createdAt);

    return c.json(
      {
        data: totalVerifiedAddresses,
      },
      200
    );
  }
);

export default app;
