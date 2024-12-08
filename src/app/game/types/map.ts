export type MapCell = {
	id: number;
	type: "empty" | "quiz" | "distribution";
	label: string | null;
};

export type MapModel = {
	cells: MapCell[];
	sequence: number[];
};
