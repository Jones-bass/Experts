import { Poll } from "@prisma/client";
import { PollsRepository } from "../repositories/polls-repository";
import { FailedToCreatePollError } from "../errors/failed-to-create-poll-error";

export class GetPollsUseCase {
  constructor(private pollsRepository: PollsRepository) {}

  async execute(pollId: string): Promise<Poll> {
    const poll = await this.pollsRepository.findByEventId(pollId);

    if (poll === null) {
      throw new FailedToCreatePollError();
    }

    return poll;
  }
}
