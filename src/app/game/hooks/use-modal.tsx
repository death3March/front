import { useCallback, useState } from "react";

import { ModalStateType } from "@/app/game/types/modal";

export const useModal = () => {
	const [modalState, setModalState] = useState<ModalStateType>({
		showWhoseTurnModal: false,
		showFuridashiModal: false,
		showSlotModal: false,
		showQuizModal: false,
		showOtoshidamaModal: false,
	});

	const openExclusiveModal = useCallback(
		(modalKey: keyof ModalStateType) => {
			setModalState({
				showWhoseTurnModal: false,
				showSlotModal: false,
				showFuridashiModal: false,
				showQuizModal: false,
				showOtoshidamaModal: false,
			});

			setModalState((prev) => ({
				...prev,
				[modalKey]: true,
			}));
		},
		[setModalState],
	);

	const closeAllModals = useCallback(() => {
		setModalState({
			showWhoseTurnModal: false,
			showSlotModal: false,
			showFuridashiModal: false,
			showQuizModal: false,
			showOtoshidamaModal: false,
		});
	}, [setModalState]);

	return { modalState, openExclusiveModal, closeAllModals };
};
