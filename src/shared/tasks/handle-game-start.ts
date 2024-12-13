import { SetStateAction } from "react";

import { GameStart } from "@/api/server-message_pb";

type Props = {
	data: GameStart;
	setMapSequence: (update: SetStateAction<number[]>) => void;
};

export const handleGameStart = ({ data, setMapSequence }: Props) => {
	console.log("Game start:", data.data?.map?.squares);
	setMapSequence(data.data?.map?.squares as number[]);
};
