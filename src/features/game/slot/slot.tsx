import { motion } from "motion/react";
import { useMemo } from "react";

interface SlotProps {
	target: number;
	symbols: string[];
	spinKey: number;
}

export const Slot = ({ target, symbols }: SlotProps) => {
	const spinLength = 60;
	const itemHeight = 100;

	const items = useMemo(() => {
		const spins = [];
		for (let i = 0; i < spinLength; i++) {
			spins.push(symbols[Math.floor(Math.random() * symbols.length)]);
		}
		spins.push(symbols[target]);
		return spins;
	}, [target, symbols]);

	const totalHeight = itemHeight * items.length;

	return (
		<div className="relative h-[300px] w-[100px] overflow-hidden rounded-md border-4">
			<motion.div
				className="flex flex-col"
				animate={{
					y: -(totalHeight - itemHeight * 3),
				}}
				transition={{ type: "tween", duration: 1.5 }}
			>
				{items.map((item, idx) => (
					<div
						key={idx}
						className="h-[100px] w-full border-b border-gray-300 bg-white text-center text-[40px] font-bold leading-[100px] text-gray-500"
					>
						{item}
					</div>
				))}
			</motion.div>
		</div>
	);
};
