import { motion } from "motion/react";
import { useSlotAnimation } from "@/features/game/hooks/use-slot-animation";
import cn from "classnames";

interface SlotProps {
  target: number;
  itemHeight?: number;
  symbols: string[];
}

export const Slot = ({
  target,
  itemHeight = 100,
  symbols,
}: SlotProps) => {
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
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden rounded-md border-4"
        style={{
          height: itemHeight * visibleCount,
          width: "250px",
        }}
      >
        <motion.div
          className="flex flex-col"
          style={{ height: totalHeight }}
          animate={controls}
        >
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
      <button
        onClick={stop}
        className={cn(
          "mt-2 px-4 py-2 rounded",
          {
            "bg-blue-500 text-white": phase === "running",
            "bg-gray-300 text-gray-600": phase !== "running",
          }
        )}
        disabled={phase !== "running"}
      >
        Stop
      </button>
    </div>
  );
};
