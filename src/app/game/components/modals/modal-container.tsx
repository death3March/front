import { ModalStateType } from "@/app/game/types/modal";
import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { UserType } from "@/shared/types/user-type";
import { Button } from "@/shared/ui/button";

import { QuizType } from "../../types/quiz";
import { Otoshidama } from "../otoshidama";
import { Quiz } from "../quiz";
import { Slot } from "../slot";

type ModalContainerProps = {
	currentUser: UserType;
	participatingUsers: UserType[];
	proccessingUserId: UserType["id"] | null;
	modalState: ModalStateType;
	target: number;
	symbols: string[];
	increasedOtoshidama: number;
	quiz: QuizType;
	onCloseModal: () => void;
	onAnswerQuiz: (answer: string) => void;
	isShowQuizeAnser: boolean;
	setShowQuizeAnswer: (isShow: boolean) => void;
};

export const ModalContainer = ({
	currentUser,
	proccessingUserId,
	participatingUsers,
	modalState,
	target,
	symbols,
	increasedOtoshidama,
	quiz,
	onCloseModal,
	onAnswerQuiz,
	isShowQuizeAnser,
	setShowQuizeAnswer,
}: ModalContainerProps) => {
	const isSameUser = proccessingUserId === currentUser.id;
	const processingUser = participatingUsers.find((user) => user.id === proccessingUserId);

	return (
		<>
			<DialogWrapper open={modalState.showWhoseTurnModal}>
				{`${isSameUser ? "あなた" : processingUser?.nickname || proccessingUserId}
                のターンです`}
				<Button onClick={onCloseModal}>OK</Button>
			</DialogWrapper>

			<DialogWrapper open={modalState.showFuridashiModal}>
				<div className="flex flex-col items-center justify-center gap-4">
					<p className="text-center text-lg font-bold text-gray-800">振り出しに戻りました...</p>
					<Button onClick={onCloseModal}>OK</Button>
				</div>
			</DialogWrapper>

			<DialogWrapper className="h-screen" open={modalState.showSlotModal}>
				<Slot target={target} symbols={symbols} onSlotEnd={onCloseModal} />
			</DialogWrapper>

			<DialogWrapper className="h-screen" open={modalState.showQuizModal}>
				<Quiz
					quiz={quiz}
					onAnswer={onAnswerQuiz}
					isShowQuizeAnser={isShowQuizeAnser}
					onCloseModal={onCloseModal}
					setShowQuizeAnswer={setShowQuizeAnswer}
				/>
			</DialogWrapper>

			<DialogWrapper className="h-screen" open={modalState.showOtoshidamaModal}>
				<Otoshidama increasedOtoshidama={increasedOtoshidama} onOtoshidamaEnd={onCloseModal} />
			</DialogWrapper>
		</>
	);
};
