import { QuizStart } from "@/api/server-message_pb";
import { QuizType } from "@/app/game/types/quiz";

type Props = {
	data: QuizStart;
	handleSetQuiz: (data: QuizType) => void;
};

export const handleQuizStart = ({ data, handleSetQuiz }: Props) => {
	console.log("Quiz start:", data.data);
	handleSetQuiz({
		questions: data.data?.quizQuestion ?? "",
		options: data.data?.options ?? [],
	});
};
