import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Form, FormField } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

interface JoinRoomFormProps {
	handleRoomJoin: (data: { roomCode: string; nickname: string }) => void;
}

const roomCodeSchema = z.object({
	nickname: z.string().min(1).trim(),
	roomCode: z.string().min(1).trim(),
});

export const JoinRoomForm = ({ handleRoomJoin }: JoinRoomFormProps) => {
	const form = useForm<z.infer<typeof roomCodeSchema>>({
		resolver: zodResolver(roomCodeSchema),
		defaultValues: {
			nickname: "",
			roomCode: "",
		},
	});

	const onSubmit = (data: z.infer<typeof roomCodeSchema>) => {
		handleRoomJoin({ roomCode: data.roomCode, nickname: data.nickname });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-64 flex-col space-y-2">
				<FormField
					control={form.control}
					name="roomCode"
					render={({ field }) => <Input type="text" placeholder="ルーム名を入力" {...field} />}
				/>
				<FormField
					control={form.control}
					name="nickname"
					render={({ field }) => <Input type="text" placeholder="ニックネームを入力" {...field} />}
				/>
				<Button type="submit" variant="default" disabled={!form.formState.isValid || form.formState.isSubmitting}>
					参加
				</Button>
			</form>
		</Form>
	);
};
