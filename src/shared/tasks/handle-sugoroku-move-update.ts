import { SugorokuMoveUpdate } from "@/api/server-message_pb";

export const handleSugorokuMoveUpdate = (data: SugorokuMoveUpdate) => {
	console.log("Sugoroku move update:", data.data);
};
