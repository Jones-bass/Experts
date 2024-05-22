import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function VotePollsController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    pollOptionId: z.string().uuid(),
  })

  const voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  const { pollOptionId } = registerBodySchema.parse(request.body);
  const { pollId } = voteOnPollParams.parse(request.params);


  let { sessionId } = request.cookies;

  if (!sessionId) {
    sessionId = randomUUID();

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      signed: true,
      httpOnly: true,
    });
  }

  return reply.status(201).send({ sessionId: sessionId });
}
