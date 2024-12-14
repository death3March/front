import { useState } from "react";

import { UserType } from "@/shared/types/user-type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

interface UserAvatarProps {
	user: UserType;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	return (
		<TooltipProvider>
			<div>
				<Tooltip open={open}>
					<TooltipTrigger asChild>
						<button
							className="relative size-8 overflow-hidden rounded-full border-2 border-white bg-primary shadow-sm"
							onClick={handleClick}
						>
							<div className="grid size-full place-items-center bg-primary text-sm font-medium text-white">
								{user.nickname[0]}
							</div>
						</button>
					</TooltipTrigger>

					<TooltipContent>{user.nickname}</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
};
