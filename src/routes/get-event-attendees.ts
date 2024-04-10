import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId/attendees', {
      schema: {
        summary: 'Get event attendees',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid()
        }),
        // tipando os parâmetros de busca por search params
        querystring: z.object({
          pageIndex: z.string().nullish().default('0').transform(Number),
          query: z.string().nullish() // nullish => pode ser undefined ou null
        }),
        response: {
          200: z.object({
            attenddes: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkedInAt: z.date().nullable()
              })
            )
          })
        }
      }
    }, async (request, reply) => {
      const { eventId } = request.params
      const { pageIndex, query } = request.query


      const attendees = await prisma.attendee.findMany({
        // Selecionando os dados que serão retornados
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          // fazendo um join para retornar dados de tabelas relacionadas com participantes
          checkIn: {
            select: {
              createdAt: true
            }
          }
        },
        // caso exista um parâmetro de busca
        where: query ? {
          eventId,
          // busca também na coluna name o parâmetro de busca
          // `ilike "%query%"`
          name: {
            contains: query
          }
        } : { eventId },
        // paginação
        take: 10,
        skip: pageIndex * 10, // pulando os dados conforme a página que o usuário estiver
        orderBy: {
          createdAt: 'desc'
        }
      })


      return reply.send({
        // formatando o retorno
        attenddes: attendees.map(attendee => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkedInAt: attendee.checkIn?.createdAt ?? null
          }
        })
      })
    })
}