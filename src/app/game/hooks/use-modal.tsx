import { useCallback, useState } from "react";

import { MessageState } from "@/shared/store/message-state-atom";

type modalState = {
	showSlotModal: boolean;
	showQuizModal: boolean;
	showOtoshidamaModal: boolean;
};

export const useModal = () => {
	const [modalState, setModalState] = useState<modalState>({
		showSlotModal: false,
		showQuizModal: false,
		showOtoshidamaModal: false,
	});

	const setModalStateWithExclusion = useCallback((messageState: MessageState["$typeName"]) => {
		setModalState((prev) => ({
			showSlotModal: false,
			showQuizModal: false,
			showOtoshidamaModal: false,
			...(messageState === "PlayerMovementDisplay" ? { showSlotModal: true } : {}),
			...(messageState === "QuizStart" ? { showQuizModal: true } : {}),
			...(messageState === "OtoshidamaEvent" ? { showOtoshidamaModal: true } : {}),
		}));
	}, []);

	return {
		modalState,
		setModalStateWithExclusion,
	};
};
