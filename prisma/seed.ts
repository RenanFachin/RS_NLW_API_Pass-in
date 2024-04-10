import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '3a0fde8e-c3e9-4e77-8b47-65ecaf0f1233', // id fixo
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs apaixonados por código',
      maximumAttendees: 320
    }
  })
}

seed().then(() => {
  console.log('Database seeded')

  prisma.$disconnect()
})