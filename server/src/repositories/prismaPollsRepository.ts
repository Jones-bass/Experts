import { Poll } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { PollWithOptions, PollsRepository, propsPolls } from "./polls-repository";

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

  async findByTitle(title: string): Promise<Poll | null> {
    const findTitle = await prisma.poll.findFirst({
      where: {title},
    })
    return findTitle
  }

  async findByEventId(pollId: string): Promise< PollWithOptions | null> {
    const getPoll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!getPoll) return null;
    return {
        id: getPoll.id,
        title: getPoll.title,
        createdAt: getPoll.createdAt,
        updateAt: getPoll.updateAt,
        options: getPoll.options.map((option) => ({
          id: option.id,
          title: option.title,
        })),
      };  
  }
}
