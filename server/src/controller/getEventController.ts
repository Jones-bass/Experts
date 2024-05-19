import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { makeGetPollsUseCase } from '../usecases/factories/make-get-polls-use-case';

export async function GetPollController(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    pollId: z.string(),
  });

    const { pollId } = eventParamsSchema.parse(request.params);

    const getPollsUseCase = makeGetPollsUseCase()

    const fetchedPolls = await getPollsUseCase.execute(pollId);
    
    return reply.status(200).send({ polls: fetchedPolls });
}
