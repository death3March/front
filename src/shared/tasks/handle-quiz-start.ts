import { QuizStart } from "@/api/server-message_pb";

export const handleQuizStart = (data: QuizStart) => {
	console.log("Quiz start:", data.data);
};
