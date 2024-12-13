import { FC } from "react";

import { Dialog, DialogContent } from "../ui/dialog";

type Props = {
	children: React.ReactNode;
	open: boolean;
	className?: string;
};

export const DialogWrapper: FC<Props> = ({ children, open, className }) => {
	return (
		<Dialog open={open}>
			<DialogContent
				className={className}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
};
