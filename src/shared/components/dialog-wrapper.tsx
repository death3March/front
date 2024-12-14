import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FC } from "react";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

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
				<VisuallyHidden>
					<DialogTitle></DialogTitle>
				</VisuallyHidden>
				{children}
			</DialogContent>
		</Dialog>
	);
};
