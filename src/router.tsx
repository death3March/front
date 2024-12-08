import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { Game } from "./pages/game";
import { Home } from "./pages/home";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Home />,
});

export const gameRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/game/$roomCode",
	component: () => <Game />,
});

export const router = createRouter({ routeTree: rootRoute.addChildren([homeRoute, gameRoute]) });
