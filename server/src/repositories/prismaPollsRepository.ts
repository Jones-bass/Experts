import { Poll } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { PollsRepository, propsPolls } from "./polls-repository";

export class prismaPollsRepository implements PollsRepository {
  async create(data: propsPolls): Promise<{ id: string }> {
    const poll = await prisma.poll.create({
      data: {
        title: data.title,
        options: {
          createMany: {
            data: data.options.map((option) => ({ title: option })),
          },
        }
      },
    });

    return poll;
  }

  async findByEventId(pollId: string): Promise< Poll | null> {
    const getPoll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
    });
    if (!getPoll) return null;
    return {
      id: getPoll.id,
      title: getPoll.title,
      createdAt: getPoll.createdAt,
      updateAt: getPoll.updateAt
    };  
  }
}
