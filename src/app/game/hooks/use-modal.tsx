import { useCallback, useState } from "react";

type ModalState = {
	showWhoseTurnModal: boolean;
	showSlotModal: boolean;
	showQuizModal: boolean;
	showOtoshidamaModal: boolean;
};

export const useModal = () => {
	const [modalState, setModalState] = useState<ModalState>({
		showWhoseTurnModal: false,
		showSlotModal: false,
		showQuizModal: false,
		showOtoshidamaModal: false,
	});

	const openExclusiveModal = useCallback(
		(modalKey: keyof ModalState) => {
			setModalState({
				showWhoseTurnModal: false,
				showSlotModal: false,
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
			showQuizModal: false,
			showOtoshidamaModal: false,
		});
	}, [setModalState]);

	return { modalState, openExclusiveModal, closeAllModals };
};
