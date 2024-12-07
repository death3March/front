// 受信メッセージの型定義
export interface JoinSuccessMessage {
    type: "joinSuccess";
    // 必要なら他のプロパティを定義
    // e.g. userId: string; roomId: string;
  }
  
  export interface ErrorMessage {
    type: "error";
    message: string;
  }
  
  // 受信する可能性のある全てのメッセージタイプをユニオン型でまとめる
  export type MessageData = JoinSuccessMessage | ErrorMessage;
  