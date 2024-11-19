import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WebSocketProvider } from "@/features/web-socket-provide.tsx";

import App from "./app.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WebSocketProvider>
			<RouterProvider router={router} />
		</WebSocketProvider>
	</StrictMode>,
);
