import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const companyTable = pgTable("company", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  max_verified_address: integer("max_verified_address").default(3000).notNull(),
  remaining_verified_address: integer("remaining_verified_address")
    .default(0)
    .notNull(),
  used_verified_address: integer("used_verified_address").default(0).notNull(),
});

export const companySchema = createInsertSchema(companyTable);

export const companyTableRelations = relations(companyTable, ({ many }) => ({
  totalVerifiedAddress: many(totalVerifiedAddressTable),
}));

export const totalVerifiedAddressTable = pgTable("totalVerifiedAddresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  total: integer("total").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  companyId: uuid("company_id").references(() => companyTable.id, {
    onDelete: "cascade",
  }),
});

export const totalVerifiedAddressSchema = createInsertSchema(
  totalVerifiedAddressTable
);

export const totalVerifiedAddressesRelations = relations(
  totalVerifiedAddressTable,
  ({ one }) => ({
    company: one(companyTable, {
      fields: [totalVerifiedAddressTable.companyId],
      references: [companyTable.id],
    }),
  })
);
