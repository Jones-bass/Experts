import { Poll } from "@prisma/client";

export interface propsPolls {
  title: string;
  options: string[];
}

export interface PollsRepository {
  create(data: propsPolls): Promise<{ id: string }>;

  findByEventId(pollId: string): Promise< Poll | null>;
}

