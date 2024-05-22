import {
  Outlet,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from "@remix-run/react";
import { Navbar } from ".";
import { GameStateProvider } from "~/contexts/GameStateContext";

export function Body() {
  return (
    <body>
      <GameStateProvider>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </GameStateProvider>
    </body>
  );
}
