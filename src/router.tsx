import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { Home } from "./pages/home";
import { Game } from "./pages/game";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Home />,
});

const gameRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/game",
	component: () => <Game />,
});

export const router = createRouter({ routeTree: rootRoute.addChildren([homeRoute,gameRoute]) });
