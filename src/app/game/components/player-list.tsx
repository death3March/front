import { User } from "@/shared/store/user-id-atom";
import { Card, CardContent } from "@/shared/ui/card";

type Props = {
	players: User[];
	currentUserId: string;
};

export const PlayerList = ({ players, currentUserId }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			{players.map((player) => (
				<Card key={player.id} className="p-4">
					<CardContent className="p-0">
						<p className="text-lg font-bold">{player.nickname}</p>
						{player.id === currentUserId && <p className="text-sm text-gray-500">(あなた)</p>}
					</CardContent>
				</Card>
			))}
		</div>
	);
};
