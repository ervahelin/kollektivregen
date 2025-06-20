const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const quotes = await prisma.quote.findMany()
  console.log(quotes)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
