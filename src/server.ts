import fastify from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { generateSlug } from './utils/generate-slug'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

const app = fastify()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// conexão com o db
const prisma = new PrismaClient({
  log: ['query']
})

app
  .withTypeProvider<ZodTypeProvider>()
  .post('/events', {
    schema: {
      // Desta forma, não será mais necessário fazer o parse do schema
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        // tipagem do retorno
        201: z.object({ eventId: z.string().uuid() })
      }
    }
  }, async (request, reply) => {

    const data = request.body

    const slug = generateSlug(data.title)

    // Verificando se já existe um evento com este mesmo slug
    const eventWithSameSlug = prisma.event.findUnique({
      where: {
        slug: slug
      }
    })

    if (eventWithSameSlug !== null) {
      throw new Error('Another event with same title already exists.')
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug
      }
    })

    return reply.status(201).send({
      eventId: event.id
    })
  })

app.listen({ port: 3333 }).then(() => {
  console.log(`HTTP server running`)
})