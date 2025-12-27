-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "subcategory_id" UUID;

-- CreateTable
CREATE TABLE "subcategories" (
    "id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
