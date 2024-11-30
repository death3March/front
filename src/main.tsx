import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { WebSocketProvider } from "@/features/web-socket-provider";

import { router } from "./router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<WebSocketProvider>
				<RouterProvider router={router} />
			</WebSocketProvider>
		</QueryClientProvider>
	</StrictMode>,
);
