import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { ServerMessage } from "@/api/server-message_pb";
import { taskQueueAtom } from "@/shared/store/task-atom";

export const useTaskQueue = () => {
	const [task, setTasks] = useAtom(taskQueueAtom);

	useEffect(() => {
		console.log("taskQueue is updated", task);
	}, [task]);

	const pushTask = useCallback(
		(task: ServerMessage) => {
			setTasks((prev) => [...prev, task]);
		},
		[setTasks],
	);

	const popTask = useCallback(() => {
		setTasks((prev) => (prev.length > 0 ? prev.slice(1) : prev));
	}, [setTasks]);

	const clearTasks = useCallback(() => {
		setTasks([]);
	}, [setTasks]);

	return { pushTask, popTask, clearTasks };
};
