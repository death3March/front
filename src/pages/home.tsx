import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { gameRoute } from "@/router";
import { JoinRoomForm } from "@/features/home/components/join-room-form";

export const Home: React.FC = () => {
	const navigate = useNavigate();

	const handleRoomJoined = (roomName: string) => {
		navigate({
		  to: gameRoute.id,
		  params: { roomName: roomName },
		});
	  };

	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-bold">ルームに参加する</h1>
			<JoinRoomForm onSubmit={handleRoomJoined} />
		</div>
	);
};
