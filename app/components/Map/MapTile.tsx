import { useEffect, useState } from "react";
import { useCtx } from "~/contexts/MapContext";
import type { MapTile } from "~/types";

export function MapTile({ id, img }: Readonly<{ id: string; img?: string }>) {
  const [image, setImage] = useState<string | undefined>();
  const [tile, setTile] = useState<MapTile>({
    x: 0,
    y: 0,
    rotation: 0,
  });

  const { setEditTile, editTile } = useCtx();
  useEffect(() => {
    if (img !== image && editTile?.id === id) setImage(img);
    if (editTile?.id === id && editTile.tile !== tile) {
      setTile(editTile.tile);
    }
  }, [editTile, id, img, image, tile]);
  const t1 = "wwwill i apper0";
  return (
    <img
      src={image}
      alt="No_Image_Selected"
      id={id}
      className={`h-60 w-60 hover:outline-slate-800 hover:outline hover:border-none hover:outline-4 relative
      ${!image && "border-solid border-gray-500 border-2 "}
      ${id === editTile?.id && "outline-dashed"} 
      `}
      style={{
        transform: `rotate(${tile.rotation}deg)`,
        transition: "transform 0.5s ease",
        left: tile.x,
        top: tile.y,
      }}
      role="presentation"
      onClick={() => setEditTile({ tile: tile, id: id, src: image })}
    ></img>
  );
}
