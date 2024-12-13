import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { Button } from "@/shared/ui/button";

import { QuizModel } from "../../types/quiz";
import { Otoshidama } from "../otoshidama";
import { Quiz } from "../quiz";
import { Slot } from "../slot";

type ModalContainerProps = {
	modalState: {
		showWhoseTurnModal: boolean;
		showSlotModal: boolean;
		showQuizModal: boolean;
		showOtoshidamaModal: boolean;
	};
	target: number;
	symbols: string[];
	quiz: QuizModel;
	onCloseModal: () => void;
	onAnswerQuiz: (answer: string) => void;
};

export const ModalContainer = ({
	modalState,
	target,
	symbols,
	quiz,
	onCloseModal,
	onAnswerQuiz,
}: ModalContainerProps) => {
	return (
		<>
			<DialogWrapper title="Whose Turn" open={modalState.showWhoseTurnModal}>
				<div>your turn</div>
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
