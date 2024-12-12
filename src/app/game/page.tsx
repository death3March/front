import { useParams } from "@tanstack/react-router";

import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

import { GameBoard } from "./components/game-board";

export const Game = () => {
	const { roomCode } = useParams({ from: gameRoute.id });

	return (
		<WebSocketProvider roomCode={roomCode}>
			<Container>
				<h1 className="text-2xl font-bold">Game : {roomCode}</h1>
				<GameBoard roomCode={roomCode} />
			</Container>
		</WebSocketProvider>
	);
};
