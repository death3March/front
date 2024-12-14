import { useParams, useSearch } from "@tanstack/react-router";

import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

import { GameBoard } from "./components/game-board";

export const Game = () => {
	const { roomCode } = useParams({ from: gameRoute.id });
	const { nickname } = useSearch({ from: gameRoute.id });

	return (
		<WebSocketProvider roomCode={roomCode} nickname={nickname}>
			<Container className="h-full min-h-screen overflow-hidden bg-map-cell bg-cover bg-center bg-repeat">
				<GameBoard roomCode={roomCode} />
			</Container>
		</WebSocketProvider>
	);
};
