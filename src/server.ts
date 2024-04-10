import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBagde } from './routes/get-attendee-badge'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'

const app = fastify()

// documentação c/ swagger
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass-in',
      description: 'Especificações da API para o back-end da aplicação pass-in',
      version: '1.0.0'
    }
  },
  // como o swagger deve compreender o schema de cada rota (integração com o zod)
  transform: jsonSchemaTransform
})


app.register(fastifySwaggerUI, {
  routePrefix: '/docs'
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBagde)
app.register(checkIn)
app.register(getEventAttendees)



app.listen({ port: 3333 }).then(() => {
  console.log('🛸 HTTP Server Running!')
})