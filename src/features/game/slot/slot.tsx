import { motion } from "motion/react";
import { useMemo } from "react";

interface SlotProps {
  target: number;
  symbols: string[];
  spinKey: number;
}

export const Slot = ({ 
  target, 
  symbols, 
  spinKey 
}: SlotProps) => {
  const spinLength = 60;
  const itemHeight = 100;

  const items = useMemo(() => {
    const spins = [];
    for (let i = 0; i < spinLength; i++) {
      spins.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    spins.push(symbols[target]);
    return spins;
  }, [target, symbols, spinKey]);

  const totalHeight = itemHeight * items.length;

  return (
    <div
      className="slot-container w-[100px] h-[300px] border-4 rounded-md overflow-hidden relative"
    >
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
            className="w-full h-[100px] leading-[100px] text-center text-[40px] bg-white border-b border-gray-300 text-gray-500 font-bold"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
