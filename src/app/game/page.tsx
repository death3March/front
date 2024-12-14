import { useParams, useSearch } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";
import { currentUserAtom } from "@/shared/store/user-id-atom";

import { GameBoard } from "./components/game-board";

export const Game = () => {
	const { roomCode } = useParams({ from: gameRoute.id });
	const { nickname } = useSearch({ from: gameRoute.id });
	const currentUser = useAtomValue(currentUserAtom);

	return (
		<WebSocketProvider roomCode={roomCode} nickname={nickname}>
			<Container className="h-full min-h-screen overflow-hidden bg-map-cell bg-cover bg-center bg-repeat">
				<GameBoard roomCode={roomCode} />
				<div>{currentUser?.nickname}</div>
			</Container>
		</WebSocketProvider>
	);
};
