import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

import { JoinRoomForm } from "@/app/home/components/join-room-form";
import { gameRoute } from "@/router";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";

export const Home: React.FC = () => {
	const navigate = useNavigate();
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);
	const [, setCurrentUser] = useAtom(currentUserAtom);

	useEffect(() => {
		setParticipatingUsers([]);
		setCurrentUser(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRoomJoin = (data: { roomCode: string; nickname: string }) => {
		navigate({
			to: gameRoute.id,
			params: { roomCode: data.roomCode },
			search: { nickname: data.nickname },
		});
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-bold">ルームに参加する</h1>
			<JoinRoomForm handleRoomJoin={handleRoomJoin} />
		</div>
	);
};
