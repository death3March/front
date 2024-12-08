import { useNavigate } from "@tanstack/react-router";
import React from "react";

import { JoinRoomForm } from "@/app/home/components/join-room-form";
import { gameRoute } from "@/router";

export const Home: React.FC = () => {
	const navigate = useNavigate();

	const handleRoomJoin = (roomCode: string) => {
		navigate({
			to: gameRoute.id,
			params: { roomCode: roomCode },
		});
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-bold">ルームに参加する</h1>
			<JoinRoomForm handleRoomJoin={handleRoomJoin} />
		</div>
	);
};