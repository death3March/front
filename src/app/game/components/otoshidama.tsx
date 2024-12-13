import { Button } from "@/shared/ui/button";

type OtoshidamaProps = {
	otoshidama: {
		total: number;
		get: number;
	};
	onOtoshidamaEnd: () => void;
};

export const Otoshidama = ({ otoshidama, onOtoshidamaEnd }: OtoshidamaProps) => {
	const onClose = () => {
		onOtoshidamaEnd();
	};

	return (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<p className="text-2xl font-bold">お年玉を獲得しました！</p>
			<img src="/otoshidama.png" alt="お年玉" className="mx-auto w-1/2" />
			<div className="flex flex-col items-center">
				<span>獲得した額</span>
				<span>{otoshidama.get}</span>
			</div>
			<div className="flex flex-col items-center">
				<span>今の所持額</span>
				<span>{otoshidama.total}</span>
			</div>

			<Button className="mx-auto" onClick={onClose}>
				Close
			</Button>
		</div>
	);
};
