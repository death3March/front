import { SetStateAction } from "react";

import { PlayerMovementDisplay } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: PlayerMovementDisplay;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
	handleSetTurnUserID: (userID: string) => void;
	handleSetMovementTarget: (target: number) => void;
};

export const handlePlayerMovementDisplay = ({
	data,
	setParticipatingUsers,
	handleSetTurnUserID,
	handleSetMovementTarget,
}: Props) => {
	const playerId = data.data?.playerId;
	const newPosition = data.data?.newPosition as number;

	console.log("playerMovementDisplay", playerId, newPosition);

	if (playerId && newPosition !== undefined) {
		handleSetTurnUserID(playerId);

		setParticipatingUsers((prev) => {
			const oldUser = prev.find((user) => user.id === playerId);
			const oldPosition = oldUser?.position ?? 0;

			const updated = prev.map((user) => (user.id === playerId ? { ...user, position: newPosition } : user));

			// 移動する差分を計算
			handleSetMovementTarget(newPosition - oldPosition);

			return updated;
		});
	}
};
