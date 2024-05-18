import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePollsUseCase } from '../usecases/factories/make-register-event-case'
import { FailedToCreatePollError } from '../errors/failed-to-create-poll-error'

export async function CreatePollsController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    options: z.array(z.string()),
  })

  const { title, options } = registerBodySchema.parse(request.body)

  try {
    const pollCreateUseCase = makeCreatePollsUseCase()

    const poll = await pollCreateUseCase.execute({
      title, 
      options,
    })

    const polls = {
      ...poll,
      options
    };

    return reply.status(201).send( polls )

  } catch (error: any) {
    if (error instanceof FailedToCreatePollError) {
      return reply.status(400).send({ error: error.message })
    }
    return reply.status(500).send({ error: 'Internal server error' })
  }
}
