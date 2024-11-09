import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import axios from "axios";
import { db } from "@/db/drizzle";
import { companyTable, totalVerifiedAddress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { OutputAddress } from "@/zustand/address";

const address_model_url = process.env.PYTHON_SERVER_URL;

const app = new Hono()
  .post(
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
      console.log(addresses);

      let corrected_addresses: OutputAddress[] = [];

      const [user] = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.email, email));

      if (!user) {
        return c.json({ error: "Unauthorized User" }, 404);
      }

      console.log(user);

      try {
        const res = await axios.post(
          `${address_model_url}/bulk_process_addresses`,
          { addresses }
        );
        corrected_addresses = res.data.data;

          await db
            .update(companyTable)
            .set({
              used_verified_address: user.used_verified_address + corrected_addresses.length,
              remaining_verified_address:
                user.max_verified_address - user.used_verified_address-corrected_addresses.length,
            })
            .where(eq(companyTable.id, user.id));

          await db.insert(totalVerifiedAddress).values({
            total: corrected_addresses.length,
            companyId: user.id,
          });

      } catch (err) {
        console.log("BULK_ADDRESS[POST]:", err);
        return c.json({ error: "Internal Server Error" }, 500);
      }

      // console.log(corrected_addresses);

      if (corrected_addresses.length <= 0) {
        console.log(corrected_addresses.length);
        return c.json({ error: "Internal Server Error" }, 500);
      }

      return c.json(
        {
          corrected_addresses,
        },
        200
      );
    }
  )
  .post(
    "/single-address",
    zValidator(
      "json",
      z.object({
        address: z.string().min(1),
      })
    ),
    zValidator(
      "param",
      z.object({
        email: z.string().email(),
      })
    ),
    async (c) => {
      const address = c.req.valid("json").address;
      const email = c.req.valid("param").email;
      // console.log(addresses);

      let corrected_address: OutputAddress | null = null;

      const [user] = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.email, email));

      if (!user) {
        return c.json({ error: "Unauthorized User" }, 404);
      }

      try {
        const res = await axios.post(`${address_model_url}/process_address`, {
          address,
        });
        corrected_address = res.data.data;
        console.log(corrected_address);
        await db.update(companyTable).set({
          used_verified_address: user.used_verified_address + 1,
          remaining_verified_address:
            user.max_verified_address - user.used_verified_address - 1,
        });
        await db.insert(totalVerifiedAddress).values({
          total: 1,
          companyId: user.id,
        });
      } catch (err) {
        console.log("BULK_ADDRESS[POST]:", err);
        return c.json({ error: "Internal Server Error" }, 500);
      }

      // console.log(corrected_address);

      if (corrected_address == null) {
        return c.json({ error: "Internal Server Error" }, 500);
      }

      return c.json(
        {
          corrected_address,
        },
        200
      );
    }
  );


export default app;
