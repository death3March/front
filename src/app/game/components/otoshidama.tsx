import { Button } from "@/shared/ui/button";

type OtoshidamaProps = {
	onOtoshidamaEnd: () => void;
};

export const Otoshidama = ({ onOtoshidamaEnd }: OtoshidamaProps) => {
	const onClose = () => {
		onOtoshidamaEnd();
	};

	return (
		<div>
			<Button onClick={onClose}>Close</Button>
		</div>
	);
};
