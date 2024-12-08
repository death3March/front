import { useParams } from "@tanstack/react-router";

import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

import { GameBoard } from "./components/game-board";

export const Game = () => {
	const { roomCode } = useParams({ from: gameRoute.id });
	const playerId = 25212;

	return (
		<WebSocketProvider roomCode={roomCode} playerId={playerId}>
			<Container>
				<h1 className="text-2xl font-bold">Game : {roomCode}</h1>
				<GameBoard />
			</Container>
		</WebSocketProvider>
	);
};
