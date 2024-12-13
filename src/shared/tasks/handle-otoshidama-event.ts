import { SetStateAction } from "react";

import { OtoshidamaEvent } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	handleSetIncreasedOtoshidama: (amount: number) => void;
	data: OtoshidamaEvent;
	currentUserId: UserType["id"] | undefined;
	setCurrentUser: (update: SetStateAction<UserType | null>) => void;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
};

export const handleOtoshidamaEvent = ({
	handleSetIncreasedOtoshidama,
	data,
	setParticipatingUsers,
	currentUserId,
	setCurrentUser,
}: Props) => {
	const playerId = data.data?.playerId;
	const otoshidamaAmount = data.data?.otoshidamaAmount;

	console.log("Otoshidama event", playerId, otoshidamaAmount);

	if (playerId && otoshidamaAmount !== undefined) {
		setParticipatingUsers((prev) => {
			const oldUser = prev.find((user) => user.id === playerId);
			const oldOtoshidama = oldUser?.otoshidama ?? 0;

			const updated = prev.map((user) => (user.id === playerId ? { ...user, otoshidama: otoshidamaAmount } : user));

			// お年玉の増加分を計算
			handleSetIncreasedOtoshidama(otoshidamaAmount - oldOtoshidama);

			return updated;
		});

		if (playerId === currentUserId) {
			setCurrentUser((prev) => {
				if (prev === null) {
					return null;
				}

				return {
					...prev,
					otoshidama: otoshidamaAmount,
				};
			});
		}
	}
};
