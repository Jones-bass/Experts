import { Vote } from "@prisma/client";

export interface propsVote {
  sessionId: string, 
  pollId: string, 
  pollOptionId: string
}

export interface VoteRepository {
  create({ sessionId, pollId, pollOptionId }: propsVote): Promise< Vote | null>;
  findUnique({ sessionId, pollId }: propsVote): Promise< Vote | undefined>;
  delete( voteId: number ): Promise<Vote | undefined>; 
}

