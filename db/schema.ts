import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const companyTable = pgTable("company", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companyTableRelations = relations(companyTable, ({ many }) => ({
  totalVerifiedAddress: many(totalVerifiedAddress),
}));

export const totalVerifiedAddress = pgTable("totalVerifiedAddresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  total: integer("total").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  companyId: uuid("company_id").references(() => companyTable.id, {
    onDelete: "cascade",
  }),
});

export const totalVerifiedAddressesRelations = relations(
  totalVerifiedAddress,
  ({ one }) => ({
    company: one(companyTable, {
      fields: [totalVerifiedAddress.companyId],
      references: [companyTable.id],
    }),
  })
);
