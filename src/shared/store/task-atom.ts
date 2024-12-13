// tasks-atom.ts
import { atom } from "jotai";

import { ServerMessage } from "@/api/server-message_pb";

export const taskQueueAtom = atom<ServerMessage[]>([]);

export const isTaskActiveAtom = atom(false);
