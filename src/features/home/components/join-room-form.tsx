import { FormEvent, useRef } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface JoinRoomFormProps {
  onSubmit: (roomName: string) => void;
}

export const JoinRoomForm = ({ onSubmit }: JoinRoomFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const roomName = inputRef.current?.value.trim();
    if (roomName) {
      onSubmit(roomName);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-64 flex-col space-y-2">
        <Input
            type="text"
            placeholder="ルーム名を入力"
            ref={inputRef}
        />
        <Button 
        type="submit" 
        variant="default"
        >
        参加
        </Button>
    </form>
  );
};
