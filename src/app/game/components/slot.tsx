import clsx from "clsx";
import { motion } from "motion/react";

import { Button } from "@/shared/ui/button";

import { useSlotAnimation } from "../hooks/use-slot-animation";

interface SlotProps {
	target: number;
	itemHeight?: number;
	symbols: string[];
	onSlotEnd: () => void;
}

export const Slot = ({ target, itemHeight = 100, symbols, onSlotEnd }: SlotProps) => {
	// 見えるスロットの縦の数
	const visibleCount = 3;
	// stopが押されてから余分に回す数
	const extraCycles = 3;
	// 表示するシンボルを3倍にすることによって最終的に止まる位置は2個目のどこかになる。
	const displaySymbols = [...symbols, ...symbols, ...symbols];
	// 表示するシンボルの総高さ
	const totalHeight = displaySymbols.length * itemHeight;

	const { controls, phase, stop } = useSlotAnimation({
		target,
		itemHeight,
		symbols,
		visibleCount,
		extraCycles,
	});

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div
				className="relative overflow-hidden rounded-md border-4"
				style={{
					height: itemHeight * visibleCount,
					width: "250px",
				}}
			>
				<motion.div className="flex flex-col" style={{ height: totalHeight }} animate={controls}>
					{displaySymbols.map((item, idx) => (
						<div
							key={idx}
							className="w-full border-b border-gray-300 bg-white text-center font-bold text-gray-500"
							style={{
								height: itemHeight,
								lineHeight: `${itemHeight}px`,
								fontSize: "40px",
							}}
						>
							{item}
						</div>
					))}
				</motion.div>
			</div>
			<Button
				onClick={stop}
				className={clsx("mt-2 w-full rounded bg-none px-4 py-2", {
					"bg-blue-500 text-white hover:bg-blue-500/90": phase === "running",
					"bg-gray-300 text-gray-600 hover:bg-gray-300/90": phase !== "running",
				})}
				disabled={phase !== "running"}
			>
				Stop
			</Button>

			<Button
				onClick={onSlotEnd}
				className={clsx("mt-2 w-full rounded bg-none px-4 py-2", {
					"bg-blue-500 text-white hover:bg-blue-500/90": phase === "completed",
					"bg-gray-300 text-gray-600 hover:bg-gray-300/90": phase !== "completed",
				})}
				disabled={phase !== "completed"}
			>
				閉じる
			</Button>
		</div>
	);
};
