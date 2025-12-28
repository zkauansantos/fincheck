/*
  Warnings:

  - Made the column `category_id` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subcategory_id` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_category_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_subcategory_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "category_id" SET NOT NULL,
ALTER COLUMN "subcategory_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
