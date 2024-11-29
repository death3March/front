export interface BlockType {
    id: string;
    color: string;
    content: string;
    type: 'condition' | 'loop' | 'action' | 'variable';
  }
  