/*
  Warnings:

  - A unique constraint covering the columns `[uploadId]` on the table `UploadEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UploadEntry_uploadId_key" ON "UploadEntry"("uploadId");

-- AddForeignKey
ALTER TABLE "UploadEntry" ADD CONSTRAINT "UploadEntry_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "FormUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
