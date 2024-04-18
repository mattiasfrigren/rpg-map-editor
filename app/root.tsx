import { Links, Meta } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css";
import { Body } from "./components";
import { images } from "./data";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  const Images = await images.getAll();
  return json({ Images });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Body />
    </html>
  );
}
