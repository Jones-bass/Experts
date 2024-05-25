import { Poll } from "@prisma/client";

export interface propsPolls {
  title: string;
  options: string[];
}

export type PollWithOptions = Poll & {
  options: {
    id: string;
    title: string;
  }[];
};

export interface PollsRepository {
  create(data: propsPolls): Promise<{ id: string }>;
  findByTitle( title: string ): Promise< Poll | null>;

  findByEventId( pollId: string ): Promise< PollWithOptions | null>;
}

