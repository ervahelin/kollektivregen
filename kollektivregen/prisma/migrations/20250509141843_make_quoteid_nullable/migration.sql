-- DropForeignKey
ALTER TABLE "FormUpload" DROP CONSTRAINT "FormUpload_quoteId_fkey";

-- AlterTable
ALTER TABLE "FormUpload" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "quoteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FormUpload" ADD CONSTRAINT "FormUpload_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
