import { useNavigate } from "@tanstack/react-router";
import React, { useEffect } from "react";

import { JoinRoomForm } from "@/features/home/components/join-room-form";
import { useWebSocketJoin } from "@/features/home/hooks/use-websocket-join";

export const Home: React.FC = () => {
	const { joinRoom, isConnected } = useWebSocketJoin();
	const navigate = useNavigate();

	useEffect(() => {
		if (isConnected) {
			navigate({ to: "/game" });
		}
	}, [isConnected, navigate]);

	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-bold">ルームに参加する</h1>
			<JoinRoomForm onSubmit={(roomName) => joinRoom(roomName)} />
		</div>
	);
};
