import { SetStateAction } from "react";

import { PlayerMovementDisplay } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: PlayerMovementDisplay;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
};

export const handlePlayerMovementDisplay = ({ data, setParticipatingUsers }: Props) => {
	const playerId = data.data?.playerId;
	const newPosition = data.data?.newPosition as number;

	console.log("playerMovementDisplay", playerId, newPosition);

	if (playerId && newPosition !== undefined) {
		setParticipatingUsers((prev: UserType[]) =>
			prev.map((user) => (user.id === playerId ? { ...user, position: newPosition } : user)),
		);
	}
};
