import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { Home } from "./pages/home";
import { ProgramTest } from "./pages/programTest";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Home />,
});

const programTestRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/program-test",
	component: () => <ProgramTest />,
});

export const router = createRouter({ routeTree: rootRoute.addChildren([homeRoute, programTestRoute]) });
