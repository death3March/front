import "./index.css";

import { RouterProvider } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { router } from "./router";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<JotaiProvider>
			<RouterProvider router={router} />
		</JotaiProvider>
	</StrictMode>,
);
