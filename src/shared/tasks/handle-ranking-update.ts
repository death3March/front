import { RankingUpdate } from "@/api/server-message_pb";

export const handleRankingUpdate = (data: RankingUpdate) => {
	console.log("Ranking update:", data.data);
};
