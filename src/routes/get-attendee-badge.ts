import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBagde(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge', {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int() // convertendo para number
        }),
        response: {

        }
      }
    }, async (request, reply) => {
      const { attendeeId } = request.params

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          // retornando também dados do evento que o usuário está cadastrado
          event: {
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
      })

      if(attendee === null) {
        throw new Error("Attendee not found.")
      }


      return reply.send({
        attendee
      })
    })
}