// Map.tsx
import { useAtom } from "jotai/react";
import { useMemo } from "react";

import { mapSequenceAtom } from "@/shared/store/map-atom";
import { UserType } from "@/shared/types/user-type";

import { MapCells } from "../config/map-cells";
import { MapCell } from "./map-cell";

interface MapProps {
	playerPositions: number[];
	participatingUsers: UserType[];
}

export const Map = ({ playerPositions, participatingUsers }: MapProps) => {
	const [mapSequence] = useAtom(mapSequenceAtom);

	const orderedCells = useMemo(() => {
		return mapSequence.map((id) => MapCells.find((cell) => cell.id === id) || null);
	}, [mapSequence]);

	const isStartIndex = 0;
	const lastIndex = orderedCells.length - 1;

	return (
		<div className="flex flex-col gap-4">
			{orderedCells.map((cell, index) => {
				if (!cell) return null;

				const isStart = index === isStartIndex;
				const isGoal = index === lastIndex;
				const isActive = playerPositions.includes(index);
				const users = participatingUsers.filter((user) => user.position === index);
				return (
					<MapCell
						key={`${cell.id}-${index}`}
						label={cell.label}
						type={cell.type}
						isStart={isStart}
						isGoal={isGoal}
						isActive={isActive}
						users={users}
					/>
				);
			})}
		</div>
	);
};
