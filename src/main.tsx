import "./index.css";

import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { router } from "./router";
import { WebSocketProvider } from "./shared/provider/websocket/websocket-provider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WebSocketProvider>
			<RouterProvider router={router} />
		</WebSocketProvider>
	</StrictMode>,
);
