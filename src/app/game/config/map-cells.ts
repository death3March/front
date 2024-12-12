import { MapCell } from "@/app/game/types/map";

export const MapCells: MapCell[] = [
	{ id: 0, type: "NORMAL", label: null },
	{ id: 1, type: "QUIZ", label: "問題" },
	{ id: 2, type: "OTOSHIDAMA", label: "お年玉配布" },
	{ id: 3, type: "FURIDASHI", label: "振り出し" },
];
