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
}
