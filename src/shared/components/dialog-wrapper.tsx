import { FC } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
	title: string;
	children: React.ReactNode;
	open: boolean;
};

export const DialogWrapper: FC<Props> = ({ title, children, open }) => {
	return (
		<Dialog open={open}>
			<DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
