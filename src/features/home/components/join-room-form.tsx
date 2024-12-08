import { FormEvent, useRef } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface JoinRoomFormProps {
	onSubmit: (roomCode: string) => void;
}

export const JoinRoomForm = ({ onSubmit }: JoinRoomFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const roomCode = inputRef.current?.value.trim();
		if (roomCode) {
			onSubmit(roomCode);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex w-64 flex-col space-y-2">
			<Input type="text" placeholder="ルーム名を入力" ref={inputRef} />
			<Button type="submit" variant="default">
				参加
			</Button>
		</form>
	);
};
