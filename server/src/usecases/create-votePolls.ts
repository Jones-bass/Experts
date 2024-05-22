import { FastifyReply, FastifyRequest } from 'fastify';
import { VotePollsController } from '../controller/votePollsController';

export async function CreateVoteOnPollUseCase (request: FastifyRequest, reply: FastifyReply) {
  return VotePollsController(request, reply)
}