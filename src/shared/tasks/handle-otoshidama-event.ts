import { OtoshidamaEvent } from "@/api/server-message_pb";

type Props = {
	data: OtoshidamaEvent;
	handleSetOtoshidama: (otoshidama: number) => void;
};

export const handleOtoshidamaEvent = ({ data, handleSetOtoshidama }: Props) => {
	handleSetOtoshidama(data.data?.otoshidamaAmount ?? 0);
};
