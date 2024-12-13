import { SetStateAction } from "react";

import { RoomJoinResponse } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: RoomJoinResponse;
	currentUser: UserType | null;
	setUserId: (value: UserType) => void;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
};

export const handleRoomJoinResponse = ({ data, currentUser, setUserId, setParticipatingUsers }: Props) => {
	console.log("Room join response:", data.data);
	console.log("current User", currentUser);

	const playerId = data.data?.playerId;
	const nickname = data.data?.nickname;
	if (playerId && nickname) {
		if (currentUser === null) {
			console.log("Setting user ID:", playerId);
			setUserId({ id: playerId, nickname });
		}
		setParticipatingUsers((prev: UserType[]) => {
			if (prev.some((user: UserType) => user.id === playerId)) {
				return prev;
			}
			return [...prev, { id: playerId, nickname }];
		});
	}
};
