import { PollsRepository } from "../repositories/polls-repository"


interface RegisterUseCaseRequest {
  title: string;
}

export class CreatePollsUseCase {
  constructor(private pollsRepository: PollsRepository) {}

  async execute({
    title,
  }: RegisterUseCaseRequest) { 

    const poll = await this.pollsRepository.create({
      title
    })

    return {
      poll,
    }
  }
}