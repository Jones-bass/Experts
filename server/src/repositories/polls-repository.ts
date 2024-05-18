import { PollOption, Prisma } from "@prisma/client";

export interface PollsRepository {
  create(data: Prisma.PollOptionCreateInput): Promise< PollOption | null>;
}

