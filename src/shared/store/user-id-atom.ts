import { atom } from "jotai";

type User = {
	id: string;
	nickname: string;
	potion?: number;
};
export const currentUserAtom = atom<User | null>(null);

export const participatingUsersAtom = atom<User[]>([]);
