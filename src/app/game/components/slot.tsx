import confetti from "canvas-confetti";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect } from "react";

import { Button } from "@/shared/ui/button";

import { useSlotAnimation } from "../hooks/use-slot-animation";

interface SlotProps {
	target: number;
	itemHeight?: number;
	symbols: string[];
	onSlotEnd: () => void;
}

const colors = ["#ed0404", "#ff6200", "#eca184", "#f8deb1"];

export const Slot = ({ target, itemHeight = 100, symbols, onSlotEnd }: SlotProps) => {
	// 見えるスロットの縦の数
	const visibleCount = 3;
	// stopが押されてから余分に回す数
	const extraCycles = 3;
	// 表示するシンボルを3倍にすることによって最終的に止まる位置は2個目のどこかになる。
	const displaySymbols = [...symbols, ...symbols, ...symbols];
	// 表示するシンボルの総高さ
	const totalHeight = displaySymbols.length * itemHeight;

	const end = Date.now() + 1 * 1000; // 3 seconds
	// アニメーションの色
	const frame = useCallback(() => {
		if (Date.now() > end) return;

		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			startVelocity: 60,
			origin: { x: 0, y: 0.5 },
			colors: colors,
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			startVelocity: 60,
			origin: { x: 1, y: 0.5 },
			colors: colors,
		});

		requestAnimationFrame(frame);
	}, [end]);

	const { controls, phase, stop } = useSlotAnimation({
		target,
		itemHeight,
		symbols,
		visibleCount,
		extraCycles,
	});

	useEffect(() => {
		if (phase === "completed") {
			frame();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phase]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div
				className="relative overflow-hidden rounded-md border-4 border-primary"
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
				onClick={phase === "running" ? stop : onSlotEnd}
				disabled={phase === "slowing" || phase === "final"}
				className={clsx("mt-12 aspect-square size-24 rounded-full bg-none")}
			>
				{phase === "running" ? "ストップ" : "閉じる"}
			</Button>
		</div>
	);
};
