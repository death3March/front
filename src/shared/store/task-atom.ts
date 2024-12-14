// tasks-atom.ts
import { atom } from "jotai";

import { ServerMessage } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

export const taskQueueAtom = atom<ServerMessage[]>([]);

export const isTaskActiveAtom = atom(false);

export const taskProccessingUserIdAtom = atom<UserType["id"] | null>(null);
