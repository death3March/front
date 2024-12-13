import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { QuizType } from "../types/quiz";

type Props = {
	quiz: QuizType;
	onAnswer: (answer: string) => void;
};

export const Quiz = ({ quiz, onAnswer }: Props) => {
	const [isSelected, seIsSelected] = useState<boolean>(false);

	const handleAnswer = (answer: string) => {
		seIsSelected(true);
		onAnswer(answer);
	};

	return (
		<div className="flex flex-col gap-8">
			<p>{quiz.questions}</p>
			<div className="grid grid-cols-2 gap-2">
				{quiz.options.map((option) => (
					<Button key={option} onClick={() => handleAnswer(option)} disabled={isSelected}>
						{option}
					</Button>
				))}
			</div>
		</div>
	);
};
