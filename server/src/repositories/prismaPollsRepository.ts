import { PollOption, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { PollsRepository } from "./polls-repository";

export class prismaPollsRepository implements PollsRepository {
  async create(data: Prisma.PollOptionCreateInput): Promise< PollOption | null> {
    const poll = await prisma.pollOption.create({
      data: {
        title: data.title,
        id: data.id
      },
    });

    return poll ? {
      id: poll.id,
      title: poll.title,
      createdAt: poll.createdAt,
      updateAt: poll.updateAt,
    } : null;
  }
}
