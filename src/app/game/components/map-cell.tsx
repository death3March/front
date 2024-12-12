// components/MapCell.tsx
import clsx from "clsx";
import { Flag, Gift, HelpCircle, Trophy } from "lucide-react";
import { ReactNode } from "react";

import { MapCell as CellType } from "../types/map";

interface MapCellProps {
	label: string | null;
	type: CellType["type"];
	isStart: boolean;
	isGoal: boolean;
	isActive: boolean;
}

export const MapCell = ({ label, type, isStart, isGoal, isActive }: MapCellProps) => {
	let content: ReactNode = label;

	if (isStart) {
		content = (
			<div className="flex flex-col items-center gap-2">
				<Flag className="size-5 text-green-700" />
				<span className="font-bold">スタート</span>
			</div>
		);
	} else if (isGoal) {
		content = (
			<div className="flex flex-col items-center gap-2">
				<Trophy className="size-5 text-blue-700" />
				<span className="font-bold">ゴール</span>
			</div>
		);
	} else {
		if (type === "QUIZ") {
			content = (
				<div className="flex flex-col items-center gap-1">
					<HelpCircle className="size-6 text-red-600" />
					<span className="font-semibold text-red-800">クイズ！</span>
					<span className="text-sm">🎍🐓✨</span>
				</div>
			);
		} else if (type === "OTOSHIDAMA") {
			content = (
				<div className="flex flex-col items-center gap-1">
					<Gift className="size-6 text-yellow-600" />
					<span className="font-semibold text-yellow-800">お年玉配布</span>
					<span className="text-sm">🧧💰🐇</span>
				</div>
			);
		} else if (type === "FURIDASHI") {
			content = (
				<div className="flex flex-col items-center gap-1 ">
					<span className="font-semibold text-gray-700">振り出し</span>
					<span className="text-sm">👘⛩️</span>
				</div>
			);
		} else {
			content = (
				<div className="flex flex-col items-center">
					<span className="font-medium text-gray-700">{label}</span>
					<span className="text-sm">🍶🎊</span>
				</div>
			);
		}
	}

	return (
		<div
			className={clsx(
				"relative grid place-items-center rounded-md border border-gray-300 p-4 transition-transform duration-300",
				{
					"bg-yellow-100": isActive,
					"bg-green-100 border-green-500 rounded-full": isStart,
					" bg-blue-100 border-blue-500 rounded-full": isGoal,
				},
			)}
		>
			<div className="absolute -bottom-4 left-1/2 h-4 w-0.5 bg-gray-300 group-last:hidden" />
			{content}
		</div>
	);
};
