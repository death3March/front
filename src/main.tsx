import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { WebSocketProvider } from "@/features/web-socket-provider";

import { route } from "./route";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WebSocketProvider>
			<RouterProvider router={route} />
		</WebSocketProvider>
	</StrictMode>,
);
