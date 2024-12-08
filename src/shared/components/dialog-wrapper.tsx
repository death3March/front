import { FC } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
	title: string;
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const DialogWrapper: FC<Props> = ({ title, children, open, onOpenChange }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
