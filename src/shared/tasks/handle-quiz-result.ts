import { SetStateAction } from "react";

import { QuizResult } from "@/api/server-message_pb";
import { UserType } from "@/shared/types/user-type";

type Props = {
	data: QuizResult;
	currentUserId: UserType["id"] | undefined;
	handleQuizAnswer: (isCorrect: boolean) => void;
	setParticipatingUsers: (update: SetStateAction<UserType[]>) => void;
	handleSetIncreasedOtoshidama: (amount: number) => void;
	setCurrentUser: (update: SetStateAction<UserType | null>) => void;
};

export const handleQuizResult = ({
	data,
	currentUserId,
	setParticipatingUsers,
	handleQuizAnswer,
	handleSetIncreasedOtoshidama,
	setCurrentUser,
}: Props) => {
	console.log("Quiz result:", data.data);

	const playerId = data.data?.PlayerId;
	const isCorrect = data.data?.isCorrect;
	const otoshidamaAmount = data.data?.otoshidamaAmount;

	if (isCorrect && playerId && otoshidamaAmount !== undefined) {
		setParticipatingUsers((prev) => {
			const oldUser = prev.find((user) => user.id === playerId);
			const oldOtoshidama = oldUser?.otoshidama ?? 0;

			const diff = otoshidamaAmount - oldOtoshidama;

			const updated = prev.map((user) => (user.id === playerId ? { ...user, otoshidama: otoshidamaAmount } : user));

			// 差分が0未満なら0に補正
			handleSetIncreasedOtoshidama(diff);

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

		handleQuizAnswer(true);

		console.log("Correct answer!");
	}
};
