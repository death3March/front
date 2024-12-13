import { OtoshidamaEvent } from "@/api/server-message_pb";

export const handleOtoshidamaEvent = (data: OtoshidamaEvent) => {
	console.log("Otoshidama event:", data.data);
};
