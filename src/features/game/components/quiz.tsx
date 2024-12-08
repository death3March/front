import { Button } from "@/shared/ui/button";

import { QuizModel } from "../types/quiz";

type Props = {
	quiz: QuizModel;
};

export const Quiz = ({ quiz }: Props) => {
	return (
		<div className="flex flex-col gap-8">
			<p>{quiz.questions}</p>
			<div className="grid grid-cols-2 gap-2">
				{quiz.options.map((option) => (
					<Button key={option}>{option}</Button>
				))}
			</div>
		</div>
	);
};
