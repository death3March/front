import { useReducer, useRef, useState } from "react";
import { Map } from "@/features/game/components/map";
import { Slot } from "@/features/game/components/slot";

function reducer(count: number) {
  return count + 1;
}

export const GameBoard = () => {
  const [ playerPosition, setPlayerPosition ] = useState(0);
  const targetRef = useRef(0);
  const showModalRef = useRef(false);

  const symbols = ["これ", "あ", "3げあ", "4", "5", "6"];
  const [_, forceRerender] = useReducer(reducer, 0);

  const openSlotModal = () => {
    // 値を決めている
    targetRef.current = Math.floor(Math.random() * symbols.length);
    console.log(symbols[targetRef.current]);
    showModalRef.current = true;
    forceRerender();
  };

  const closeSlotModal = () => {
    showModalRef.current = false;
    setPlayerPosition((prev) => (prev + targetRef.current));
    forceRerender();
  };

  return (
    <div>
      <Map playerPosition={playerPosition} />

      <div className="mt-8 flex flex-col items-center">
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded" 
            onClick={openSlotModal}
          >
            Open Slot
          </button>
        </div>

        {showModalRef.current && (
          <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-md bg-white p-8 relative">
              <h2 className="mb-4 text-xl font-bold">Slot Result</h2>
              <Slot target={targetRef.current} symbols={symbols} />
              <button 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded" 
                onClick={closeSlotModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
