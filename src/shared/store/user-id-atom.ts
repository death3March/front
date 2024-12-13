import { atom } from "jotai";

import { UserType } from "@/shared/types/user-type";

export const currentUserAtom = atom<Pick<UserType, "id" | "nickname"> | null>(null);

export const participatingUsersAtom = atom<UserType[]>([]);
