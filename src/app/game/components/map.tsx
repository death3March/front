import { useAtom } from "jotai/react";
import { useMemo } from "react";

import { mapSequenceAtom } from "@/shared/store/map-atom";

import { MapCells } from "../config/map-cells";

interface MapProps {
	playerPosition: number;
}

export const Map = ({ playerPosition }: MapProps) => {
	const [mapSequence] = useAtom(mapSequenceAtom);

	const orderedCells = useMemo(() => {
		return mapSequence.map((id) => MapCells.find((cell) => cell.id === id) || null);
	}, [mapSequence]);

	return (
		<div className="flex flex-col gap-4">
			{orderedCells.map((cell, index) => {
				if (!cell) return null;

				return (
					<div
						key={`${cell.id}-${index}`}
						className={`group relative grid h-[100px] w-full place-items-center rounded-md border border-gray-300 bg-white p-1 
						${index === playerPosition ? "bg-yellow-100" : ""}`}
					>
						<div className="absolute -bottom-4 left-1/2 h-4 w-0.5 bg-gray-300 group-last:hidden" />
						{cell.label}
					</div>
				);
			})}
		</div>
	);
};
