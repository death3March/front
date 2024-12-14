import { SetStateAction } from "react";

import { PlayerTurnStart } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: PlayerTurnStart;
	setProccessingUserId: (update: SetStateAction<UserType["id"] | null>) => void;
};

export const handlePlayerTurnStart = ({ data, setProccessingUserId }: Props) => {
	console.log("Player turn start:", data.data);
	setProccessingUserId(data.data?.playerId ?? null);
};
