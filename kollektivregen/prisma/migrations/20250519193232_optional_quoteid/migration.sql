-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "UploadEntry" DROP CONSTRAINT "UploadEntry_uploadId_fkey";

-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "quoteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UploadEntry" ALTER COLUMN "uploadId" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadEntry" ADD CONSTRAINT "UploadEntry_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "FormUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;
