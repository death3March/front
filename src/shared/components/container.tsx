import { cn } from "../utils/shadcn";

type Props = {
	children?: React.ReactNode;
	className?: string;
};

export const Container = ({ children, className }: Props) => {
	return <div className={cn("container mx-auto p-4", className)}>{children}</div>;
};
