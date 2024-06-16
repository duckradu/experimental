CREATE TABLE IF NOT EXISTS "actors" (
	"id" serial PRIMARY KEY NOT NULL,
	"pid" varchar NOT NULL,
	"email" varchar NOT NULL,
	"encrypted_password" varchar NOT NULL,
	"name" varchar(255),
	"note" text,
	"external_url" text,
	"dob" timestamp with time zone,
	"onboarding_in_progress" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "actors_pid_unique" UNIQUE("pid"),
	CONSTRAINT "actors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_actors_on_pid" ON "actors" USING btree ("pid");