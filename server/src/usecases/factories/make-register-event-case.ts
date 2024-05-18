
import { prismaPollsRepository } from '../../repositories/prismaPollsRepository'
import { CreatePollsUseCase } from '../create-polls'

export function makeCreatePollsUseCase() {
  const pollsRepository = new prismaPollsRepository()
  const polssCreateCase = new CreatePollsUseCase(pollsRepository)

  return polssCreateCase
}