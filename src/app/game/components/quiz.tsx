import { MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { QuizType } from "../types/quiz";

type Props = {
	title?: string;
	quiz: QuizType;
	onAnswer: (answer: string) => void;
	onCloseModal: () => void;
	isShowQuizeAnser: boolean;
	setShowQuizeAnswer: (isShow: boolean) => void;
};

export const Quiz = ({ quiz, onAnswer, onCloseModal, isShowQuizeAnser, setShowQuizeAnswer }: Props) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleAnswer = (answer: string) => {
		setSelectedOption(answer);
		onAnswer(answer);
	};

	const handleCloseModal = () => {
		setShowQuizeAnswer(false);
		onCloseModal();
	};

	if (isShowQuizeAnser) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-12">
				<div className="inline-flex rounded-lg bg-yellow-200 p-3">
					<MessageCircleQuestion className="mr-2 size-20" />
					<p className="text-xl font-bold">{quiz.questions}</p>
				</div>

				<div className="my-4 w-full space-y-2">くいず</div>
				<Button onClick={handleCloseModal}>OK</Button>
			</div>
		);
	} else {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-12">
				<div className="inline-flex rounded-lg bg-yellow-200 p-3">
					<MessageCircleQuestion className="mr-2 size-20" />
					<p className="text-xl font-bold">{quiz.questions}</p>
				</div>

				<div className="my-4 w-full space-y-2">
					{quiz.options.map((option) => (
						<Button
							className="w-full"
							onClick={() => handleAnswer(option)}
							disabled={selectedOption !== null}
							key={option}
						>
							{option}
						</Button>
					))}
				</div>
			</div>
		);
	}
};
