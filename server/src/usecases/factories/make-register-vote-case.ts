
import { prismaVotePollsRepository } from '../../repositories/prismaVotePollsRepository'
import { CreateVoteOnPollUseCase } from '../create-votePolls'

export function makeCreateVoteUseCase() {
  const votesRepository = new prismaVotePollsRepository()
  const votePollsCreateCase = new CreateVoteOnPollUseCase(votesRepository)

  return votePollsCreateCase
}