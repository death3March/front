import "./index.css";

import { RouterProvider } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan";

import { router } from "./router";

if (import.meta.env.DEV) {
	scan({
		enabled: true,
	});
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<JotaiProvider>
			<RouterProvider router={router} />
		</JotaiProvider>
	</StrictMode>,
);
