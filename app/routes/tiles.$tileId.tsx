import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { images } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.tileId, "Missing tileId param");
  const tile = await images.get(params.tileId);

  if (!tile) throw new Response("Not Found", { status: 404 });
  return json({ tile });
};

export default function Tile() {
  const { tile } = useLoaderData<typeof loader>();

  return (
    <div className="h-1/3 w-1/3 mr-auto ml-auto">
      <img src={tile.src} alt={tile.name} />
      <p>{tile.name}</p>
    </div>
  );
}
