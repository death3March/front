import { Coins } from "lucide-react";

import { Button } from "@/shared/ui/button";

type OtoshidamaProps = {
	increasedOtoshidama: number;
	onOtoshidamaEnd: () => void;
};

export const Otoshidama = ({ increasedOtoshidama, onOtoshidamaEnd }: OtoshidamaProps) => {
	const onClose = () => {
		onOtoshidamaEnd();
	};

	return (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<p className="text-2xl font-bold">お年玉を獲得しました！</p>
			<img src="/otoshidama.png" alt="お年玉" className="mx-auto w-1/2" />

			<div className="flex items-center">
				<div className=" mr-6 flex items-center gap-2 rounded-lg bg-white">
					<Coins className="size-6 text-yellow-500" />
					<p className="text-lg font-bold text-gray-800">{increasedOtoshidama}円</p>
				</div>
			</div>

			<Button className="mx-auto" onClick={onClose}>
				閉じる
			</Button>
		</div>
	);
};
