import { Vote } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { VoteRepository, propsVote } from "./vote-repository";
import { title } from "node:process";

export class prismaVotePollsRepository implements VoteRepository {
  async create({ sessionId, pollId, pollOptionId }: propsVote): Promise<Vote | null> {
    const votePolls = await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      }, 
      select: {
        id: true,
        sessionId: true,
        pollId: true,
        pollOptionId: true,
        createdAt: true,

        pollOption: {
          select: {
            title: true
          }
        }
      }
    });
    return votePolls      
    
   }

  async findUnique({ sessionId, pollId }: propsVote): Promise<Vote | undefined> {
    const findVote = await prisma.vote.findUnique({
      where: {
        sessionId_pollId: {
          sessionId,
          pollId,

        }
      }
    });
    if (!findVote) return undefined; 

    return {
      id: findVote.id,
      createdAt: findVote.createdAt,
      pollId: findVote.pollId,
      pollOptionId: findVote.pollOptionId,
      sessionId: findVote.sessionId
    };   
   }

  async delete(voteId: number): Promise<Vote | undefined> {
    const deleAll = await prisma.vote.delete({
      where: {
        id: voteId, 
        
      }
    });
    return deleAll;
  }
}