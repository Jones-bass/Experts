import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePollsUseCase } from '../usecases/factories/make-register-event-case'
import { FailedToCreatePollError } from '../errors/failed-to-create-poll-error'

export async function CreatePollsController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
  })

  const { title } = registerBodySchema.parse(request.body)

  try {
    const pollCreateUseCase = makeCreatePollsUseCase()

    const poll = await pollCreateUseCase.execute({
      title,
    })

    return reply.status(201).send({ pollId: poll.poll?.id })

  } catch (error: any) {
    if (error instanceof FailedToCreatePollError) {
      return reply.status(400).send({ error: error.message })
    }
    return reply.status(500).send({ error: 'Internal server error' })
  }
}
