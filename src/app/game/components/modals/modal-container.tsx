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
	modalState: ModalStateType;
	target: number;
	symbols: string[];
	increasedOtoshidama: number;
	quiz: QuizType;
	onCloseModal: () => void;
	onAnswerQuiz: (answer: string) => void;
};

export const ModalContainer = ({
	currentUser,
	modalState,
	target,
	symbols,
	increasedOtoshidama,
	quiz,
	onCloseModal,
	onAnswerQuiz,
}: ModalContainerProps) => {
	return (
		<>
			<DialogWrapper open={modalState.showWhoseTurnModal}>
				{`${currentUser.nickname}のターンです`}
				<Button onClick={onCloseModal}>OK</Button>
			</DialogWrapper>

			<DialogWrapper open={modalState.showFuridashiModal}>
				振り出しに戻りました...
				<Button onClick={onCloseModal}>OK</Button>
			</DialogWrapper>

			<DialogWrapper className="min-h-screen" open={modalState.showSlotModal}>
				<Slot target={target} symbols={symbols} onSlotEnd={onCloseModal} />
			</DialogWrapper>

			<DialogWrapper className="min-h-screen" open={modalState.showQuizModal}>
				<Quiz quiz={quiz} onAnswer={onAnswerQuiz} />
			</DialogWrapper>

			<DialogWrapper className="min-h-screen" open={modalState.showOtoshidamaModal}>
				<Otoshidama increasedOtoshidama={increasedOtoshidama} onOtoshidamaEnd={onCloseModal} />
			</DialogWrapper>
		</>
	);
};
