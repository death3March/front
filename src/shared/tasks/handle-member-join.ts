import { SetStateAction } from "react";

import { RoomMemberData } from "@/api/server-message_pb";

import { UserType } from "../types/user-type";

type Props = {
	data: RoomMemberData;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
};

export const handleMemberJoin = ({ data, setParticipatingUsers }: Props) => {
	console.log("handleMemberJoin", data);
	setParticipatingUsers((prev: UserType[]) => {
		console.log("prev", prev);
		if (prev.some((user: UserType) => user.id === data.playerId)) {
			return prev;
		}
		return [...prev, { id: data.playerId, nickname: data.nickname }];
	});
};
