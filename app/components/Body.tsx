import {
  Outlet,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from "@remix-run/react";
import { Navbar } from ".";

export function Body() {
  return (
    <body>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}
