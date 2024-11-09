CREATE TABLE IF NOT EXISTS "totalVerifiedAddresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"company_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "totalVerifiedAddresses" ADD CONSTRAINT "totalVerifiedAddresses_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
