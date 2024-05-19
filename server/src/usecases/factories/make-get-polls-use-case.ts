import { prismaPollsRepository } from '../../repositories/prismaPollsRepository'

import { GetPollsUseCase } from '../get-polls'

export function makeGetPollsUseCase() {
  const pollsRepository = new prismaPollsRepository()
  const pollsCase = new GetPollsUseCase(pollsRepository)

  return pollsCase
}

