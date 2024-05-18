import { PollsRepository } from "../repositories/polls-repository"

interface RegisterUseCaseRequest {
  title: string;
  options: string[];
}

export class CreatePollsUseCase {
  constructor(private pollsRepository: PollsRepository) {}

  async execute({
    title,
    options
  }: RegisterUseCaseRequest) { 

    const poll = await this.pollsRepository.create({
      title,
      options
    })

    return {
      poll,
    }
  }
}