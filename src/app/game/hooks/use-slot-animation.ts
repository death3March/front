import { useAnimation } from "motion/react";
import { useEffect, useState } from "react";

type SlotPhase = "running" | "slowing" | "final" | "completed";

interface SlotAnimationProps {
	target: number;
	itemHeight: number;
	symbols: string[];
	visibleCount: number;
	extraCycles: number;
}

export const useSlotAnimation = ({ target, itemHeight, symbols, visibleCount, extraCycles }: SlotAnimationProps) => {
	const controls = useAnimation();
	const [phase, setPhase] = useState<SlotPhase>("running");

	const cycleHeight = symbols.length * itemHeight;
	const finalIndex = target + symbols.length;
	const finalY = -(finalIndex * itemHeight - itemHeight * (visibleCount - 1));

	useEffect(() => {
		if (phase === "running") {
			// Spin indefinitely
			controls.start({
				y: [0, -cycleHeight],
				transition: {
					repeat: Infinity,
					duration: 0.2,
					ease: "linear",
				},
			});
		} else if (phase === "slowing") {
			// Slow down after extraCycles, then move to final phase
			controls
				.start({
					y: [0, -cycleHeight],
					transition: {
						repeat: extraCycles,
						duration: 0.4,
						ease: "linear",
					},
				})
				.then(() => {
					setPhase("final");
				});
		} else if (phase === "final") {
			// Animate to final stop position
			controls
				.start({
					y: [0, finalY],
					transition: {
						duration: 2,
						ease: [0.2, 1, 0.2, 1.1],
					},
				})
				.then(() => {
					setPhase("completed");
				});
		}
	}, [phase, controls, cycleHeight, finalY, extraCycles]);

	const stop = () => {
		setPhase("slowing");
	};

	return { controls, phase, stop };
};
