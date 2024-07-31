CREATE SCHEMA "shopping_list";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_list"."shopping_list_connection" (
	"item_id" uuid,
	"category_id" uuid,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_list"."carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creation_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_list"."categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_list"."items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_list"."shopping_list_connection" ADD CONSTRAINT "shopping_list_connection_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "shopping_list"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_list"."shopping_list_connection" ADD CONSTRAINT "shopping_list_connection_item_id_carts_id_fk" FOREIGN KEY ("item_id") REFERENCES "shopping_list"."carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_list"."shopping_list_connection" ADD CONSTRAINT "shopping_list_connection_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "shopping_list"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
