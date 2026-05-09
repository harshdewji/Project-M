const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const contacts = await prisma.contact.findMany();
  console.log('Contacts:', JSON.stringify(contacts, null, 2));
  
  const consultations = await prisma.consultation.findMany();
  console.log('Consultations:', JSON.stringify(consultations, null, 2));
  
  const inquiries = await prisma.inquiry.findMany();
  console.log('Inquiries:', JSON.stringify(inquiries, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
