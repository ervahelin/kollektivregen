const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Lösche UploadEntry...");
  await prisma.uploadEntry.deleteMany({});
  
  console.log("Lösche FormUpload...");
  await prisma.formUpload.deleteMany({});
  
  console.log("Lösche Gallery...");
  await prisma.gallery.deleteMany({});

  console.log("Alle Einträge wurden gelöscht.");
}

main()
  .catch((e) => {
    console.error("Fehler beim Löschen:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
