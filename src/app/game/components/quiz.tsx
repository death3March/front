import { MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { QuizType } from "../types/quiz";

type Props = {
	title?: string;
	quiz: QuizType;
	onAnswer: (answer: string) => void;
};

export const Quiz = ({ quiz, onAnswer }: Props) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleAnswer = (answer: string) => {
		setSelectedOption(answer);
		onAnswer(answer);
	};

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="inline-flex rounded-lg bg-yellow-200 p-3">
				<MessageCircleQuestion className="mr-2 size-20" />
				<p className="text-xl font-bold">{quiz.questions}</p>
			</div>

			<div className="my-4 grid w-full grid-cols-2 gap-4">
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
};
