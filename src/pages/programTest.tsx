'use client'

import { AvailableBlockCard } from '@/features/programing/component/availableBlockCard'
import { BlockType } from '@/features/programing/types/blockType'
import { useCurrentAvailableBlock } from '@/features/programing/hook/useCurrentAvailableBlock'
import editorStyle from '@/features/programing/styles/editor.module.css'

const initialBlocks: BlockType[] = [
  { id: '1', color: 'bg-red-500', content: 'もし敵が見つかったら', type: 'condition' },
  { id: '2', color: 'bg-blue-500', content: 'ずっと実行', type: 'loop' },
  { id: '3', color: 'bg-green-500', content: '攻撃する', type: 'action' },
  { id: '4', color: 'bg-yellow-500', content: '移動する', type: 'action' },
  { id: '5', color: 'bg-purple-500', content: '変数 x を 10 に設定', type: 'variable' },
  { id: '6', color: 'bg-pink-500', content: 'x が 0 になるまで実行', type: 'loop' },
  { id: '7', color: 'bg-indigo-500', content: 'ジャンプする', type: 'action' },
  { id: '8', color: 'bg-orange-500', content: '終了する', type: 'action' },
];

export const ProgramTest = () => {
  const { availableBlocks, stackedBlocks, selectBlock } = useCurrentAvailableBlock({ initialBlocks });

  return (
    <div className={`${editorStyle.background} flex flex-col items-center justify-center min-h-screen bg-gray-50`}>
      <div className="w-full max-w-2xl flex flex-col h-screen px-4 py-10">
        <div className="flex flex-col gap-2 mb-56">
          {stackedBlocks.length === 0 ? (
            <p className="text-gray-500">ここに選択したブロックが表示されます。</p>
          ) : (
            stackedBlocks.map((block, index) => {
              return (
                <div
                  key={block.id}
                  className={`inline-flex p-2 rounded-md ${block.color} text-white`}
                >
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                  {block.content}
                </div>
              );
            })
          )}
        </div>

        <div className="fixed bottom-0 h-56 left-0 w-full border-t-2 border-gray-200 bg-gray-50 p-4">
          {availableBlocks.length === 0 ? (
              <p className="text-gray-500">利用可能なカードがありません。</p>
            ) : (
              <div className='h-full grid grid-cols-2 gap-4'>
                {availableBlocks.map((block) => {
                  return (
                    <AvailableBlockCard
                      key={block.id}
                      id={block.id}
                      color={block.color}
                      content={block.content}
                      onclick={() => selectBlock(block)}
                    />
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
