// 送信メッセージの型定義
export interface JoinMessage {
    type: "join";
    room: string;
}
  
// 今後他のメッセージを追加する場合はここに並べていく
// e.g. export interface StartGameMessage { type: "startGame"; ... }
  
export type OutboundMessage = JoinMessage; // | StartGameMessage | ...
  