ALTER TABLE "company" ADD COLUMN "max_verified_address" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "remaining_verified_address" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "used_verified_address" integer DEFAULT 0 NOT NULL;