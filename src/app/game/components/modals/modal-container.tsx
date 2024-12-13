import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { UserType } from "@/shared/types/user-type";
import { Button } from "@/shared/ui/button";

import { QuizType } from "../../types/quiz";
import { Otoshidama } from "../otoshidama";
import { Quiz } from "../quiz";
import { Slot } from "../slot";

type ModalContainerProps = {
	currentUser: UserType;
	modalState: {
		showWhoseTurnModal: boolean;
		showSlotModal: boolean;
		showQuizModal: boolean;
		showOtoshidamaModal: boolean;
	};
	target: number;
	symbols: string[];
	quiz: QuizType;
	onCloseModal: () => void;
	onAnswerQuiz: (answer: string) => void;
};

export const ModalContainer = ({
	currentUser,
	modalState,
	target,
	symbols,
	quiz,
	onCloseModal,
	onAnswerQuiz,
}: ModalContainerProps) => {
	return (
		<>
			<DialogWrapper title={`${currentUser.nickname}のターンです`} open={modalState.showWhoseTurnModal}>
				<Button onClick={onCloseModal}>OK</Button>
			</DialogWrapper>

			<DialogWrapper title="Slot Result" open={modalState.showSlotModal}>
				<Slot target={target} symbols={symbols} onSlotEnd={onCloseModal} />
			</DialogWrapper>

			<DialogWrapper title="Quiz" open={modalState.showQuizModal}>
				<Quiz quiz={quiz} onAnswer={onAnswerQuiz} />
			</DialogWrapper>

			<DialogWrapper title="Otoshidama" open={modalState.showOtoshidamaModal}>
				<Otoshidama onOtoshidamaEnd={onCloseModal} />
			</DialogWrapper>
		</>
	);
};
