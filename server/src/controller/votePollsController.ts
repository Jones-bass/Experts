import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { makeCreateVoteUseCase } from '../usecases/factories/make-register-vote-case';
import { FailedToCreatePollError } from '../errors/failed-to-create-poll-error';

export async function VotePollsController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    pollOptionId: z.string().uuid(),
  })

  const voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  const { pollOptionId } = registerBodySchema.parse(request.body);
  const { pollId } = voteOnPollParams.parse(request.params);
  try {


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

    const pollCreateUseCase = makeCreateVoteUseCase();

    const pollsVote = await pollCreateUseCase.execute({
      pollId,
      pollOptionId,
      sessionId,
    });


    return reply.status(201).send(pollsVote);

  } catch (error: any) {
    if (error instanceof FailedToCreatePollError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: 'Internal server error' });
  }
}