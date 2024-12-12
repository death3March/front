export type MapCell = {
	id: number;
	type: "NORMAL" | "QUIZ" | "OTOSHIDAMA" | "FURIDASHI";
	label: string | null;
};

export type MapModel = {
	cells: MapCell[];
	sequence: number[];
};
