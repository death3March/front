import { useMemo } from "react";

import { MapModel } from "../types/map-cell";

const mockMap: MapModel = {
	cells: [
		{ id: 1, type: "empty", label: null },
		{ id: 2, type: "quiz", label: "問題1" },
		{ id: 3, type: "distribution", label: "問題2" },
		{ id: 4, type: "quiz", label: "問題3" },
		{ id: 5, type: "empty", label: null },
		{ id: 6, type: "distribution", label: "お年玉配布" },
	],
	sequence: [1, 2, 3, 6, 5, 4],
};

interface MapProps {
	playerPosition: number;
}

export const Map = ({ playerPosition }: MapProps) => {
	const orderedCells = useMemo(() => mockMap.sequence.map((id) => mockMap.cells[id - 1]), []);
	return (
		<div className="flex flex-col gap-4">
			{orderedCells.map((cell, index) => (
				<div
					key={cell.id}
					className={`group relative grid h-[100px] w-full place-items-center rounded-md border border-gray-300 bg-white p-1 
					${index === playerPosition ? "bg-yellow-100" : ""}`}
				>
					<div className="absolute -bottom-4 left-1/2 h-4 w-0.5 bg-gray-300 group-last:hidden" />
					{cell.label}
				</div>
			))}
		</div>
	);
};
