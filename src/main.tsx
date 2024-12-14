import "./index.css";
import "jotai-devtools/styles.css";

import { RouterProvider } from "@tanstack/react-router";
import { DevTools } from "jotai-devtools";
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
		<DevTools />
		<RouterProvider router={router} />
	</StrictMode>,
);
