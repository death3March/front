import { useParams } from "@tanstack/react-router";

import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

import { GameBoard } from "./components/game-board";

export const Game = () => {
	const { roomCode } = useParams({ from: gameRoute.id });

	return (
		<WebSocketProvider roomCode={roomCode}>
			<h2 className="mx-4 my-2 flex items-center justify-end text-lg font-bold">
				<span className="inline-block rounded-md border border-gray-300 bg-gray-100 px-3 py-0.5 font-mono text-gray-800">
					{roomCode}
				</span>
			</h2>
			<Container>
				<GameBoard roomCode={roomCode} />
			</Container>
		</WebSocketProvider>
	);
};
