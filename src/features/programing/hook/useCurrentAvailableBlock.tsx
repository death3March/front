import { BlockType } from '@/features/programing/types/blockType'
import { useState } from 'react'

interface useCurrentAvailableBlockProps {
    initialBlocks: BlockType[]
}
export const useCurrentAvailableBlock = ({
    initialBlocks
}: useCurrentAvailableBlockProps ) => {
    // 4つしか入らない
    const [availableBlocks, setAvailableBlocks] = useState<BlockType[]>(initialBlocks.slice(0, 4))

    // 選択されたブロックがスタックで入っていく
    const [stackedBlocks, setStackedBlocks] = useState<BlockType[]>([])

    const selectBlock = (block: BlockType) => {
        setStackedBlocks(prev => [...prev, block])
        setAvailableBlocks(prev => {
            // まだ選ばれていないブロックを取得してそれを入れているだけ
            const newBlocks = prev.filter(b => b.id !== block.id)
            return [
                ...newBlocks,
                ...initialBlocks.filter(b =>
                    ![...stackedBlocks, block].some(sb => sb.id === b.id) &&
                    !newBlocks.some(nb => nb.id === b.id)
                ).slice(0, 1)
            ]
        })
    }

    return {
        availableBlocks,
        stackedBlocks,
        selectBlock
    }
}