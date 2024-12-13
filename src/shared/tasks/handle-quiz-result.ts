import { QuizResult } from "@/api/server-message_pb";

export const handleQuizResult = (data: QuizResult) => {
	console.log("Quiz result:", data.data);
};
