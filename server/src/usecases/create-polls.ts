import { FailedToCreatePollError } from "../errors/failed-to-create-poll-error";
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

    const eventWithSameSlug = await this.pollsRepository.findByTitle(title);
    
    if (eventWithSameSlug !== null) {
      throw new FailedToCreatePollError();
    }

    const poll = await this.pollsRepository.create({
      title,
      options
    })

    return {
      poll,
    }
  }
}