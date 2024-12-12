import { atom } from "jotai";

export type User = {
	id: string;
	nickname: string;
	position?: number;
};
export const currentUserAtom = atom<Pick<User, "id" | "nickname"> | null>(null);

export const participatingUsersAtom = atom<User[]>([]);
