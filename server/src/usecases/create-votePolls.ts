import { VoteRepository } from '../repositories/vote-repository';
import { Vote } from '@prisma/client';

interface RegisterUseCaseRequest {
  pollId: string;
  pollOptionId: string;
  sessionId: string;
}

export class CreateVoteOnPollUseCase {
  constructor(private voteRepository: VoteRepository) {}

  async execute(
    { pollId, pollOptionId, sessionId }: RegisterUseCaseRequest,
  ): Promise<Vote | null> {
    
    const userPreviousVoteOnPoll = await this.voteRepository.findUnique({ sessionId, pollId, pollOptionId });

    if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
      await this.voteRepository.delete(userPreviousVoteOnPoll.id);
    }

    const votePoll = await this.voteRepository.create({ pollId, sessionId, pollOptionId });

    return votePoll;
  }
}
