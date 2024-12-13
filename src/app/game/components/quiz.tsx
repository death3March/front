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
		<div className="flex flex-col">
			<div className="">
				<div className="inline-flex rounded-lg bg-yellow-200 p-3">
					<MessageCircleQuestion className="mr-2 size-20" />
					<p className="text-xl font-bold">{quiz.questions}</p>
				</div>

				<div className="my-14 space-y-3">
					{quiz.options.map((option) => (
						<Button onClick={() => handleAnswer(option)} disabled={selectedOption !== null} key={option}>
							<span className="w-full py-2 text-start text-lg font-semibold">{option}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
};
