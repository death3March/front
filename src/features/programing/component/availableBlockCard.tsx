import { Button } from "@/shared/ui/button";

interface AvailableBlockCardProps {
    id: string;
    color: string;
    content: string;
    onclick: () => void;
}

export const AvailableBlockCard = ({
    id, 
    color, 
    content, 
    onclick
}: AvailableBlockCardProps) => {
    return (
        <Button
              key={id}
              className={`${color} h-full`}
              onClick={onclick}
            >
            <span className="text-lg text-wrap md:text-2xl text-white font-bold">
                {content}
            </span>
        </Button>
    )
}