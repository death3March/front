import { GameBoard } from "@/features/game/game-board";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

export const Game = () => {

	return (
        <WebSocketProvider>
            <Container>
                
                <GameBoard />
            </Container>
        </WebSocketProvider>
	);
};
