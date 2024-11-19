import { createBrowserRouter } from "react-router-dom";

import { Home } from "./features/home/pages";

export const route = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
]);
