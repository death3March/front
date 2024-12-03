import { Slot } from "@/features/game/slot/slot";
import { useState } from "react";

export const Game = () => {
  const symbols = ["1", "2", "3", "4", "5", "6"];
  const slotCount = 4;

  const [spinKey, setSpinKey] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const spinSlots = () => {
    const newSelectedIndexes = Array.from({ length: slotCount }, () =>
      Math.floor(Math.random() * symbols.length)
    );
    setSelectedIndexes(newSelectedIndexes);
    setSpinKey(prev => prev + 1);
  };

  if (selectedIndexes.length === 0) {
    spinSlots();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div style={{ display: "flex", gap: "20px" }}>
        {selectedIndexes.map((target, idx) => (
          <Slot key={idx} target={target} symbols={symbols} spinKey={spinKey} />
        ))}
      </div>
    </div>
  );
};
