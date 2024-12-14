import { SetStateAction } from "react";

import { PlayerTurnStart } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: PlayerTurnStart;
	setTaskProccessingUserId: (update: SetStateAction<UserType["id"] | null>) => void;
};

export const handlePlayerTurnStart = ({ data, setTaskProccessingUserId }: Props) => {
	console.log("Player turn start:", data.data);
	setTaskProccessingUserId(data.data?.playerId ?? null);
};
