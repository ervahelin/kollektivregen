-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "text_formatted" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormUpload" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "checkbox" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "FormUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadEntry" (
    "id" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "UploadEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormUpload" ADD CONSTRAINT "FormUpload_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadEntry" ADD CONSTRAINT "UploadEntry_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
