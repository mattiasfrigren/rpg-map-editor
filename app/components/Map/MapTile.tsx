import { useEffect, useState } from "react";
import { useCtx } from "~/contexts/MapContext";
import type { MapTile } from "~/types";

export function MapTile({ id, img }: Readonly<{ id: string; img?: string }>) {
  const [tile, setTile] = useState<MapTile>({
    x: 0,
    y: 0,
    rotation: 0,
    image: undefined,
  });

  const { setEditTile, editTile } = useCtx();
  useEffect(() => {
    if (editTile?.id === id && editTile.tile !== tile) {
      setTile(editTile.tile);
    }
  }, [editTile, id, img, tile]);

  return (
    <div
      id={id}
      className={`h-60 w-60 hover:outline-slate-800 hover:outline hover:border-none hover:outline-4 relative
    ${!tile.image && "border-solid border-gray-500 border-2 "}
    ${id === editTile?.id && "outline-dashed"} 
    `}
      style={{
        transform: `rotate(${tile.rotation}deg)`,
        transition: "transform 0.5s ease",
        left: tile.x,
        top: tile.y,
      }}
      role="presentation"
      onClick={() => setEditTile({ tile: tile, id: id })}
    >
      <img
        className="h-full w-full max-w-xs max-h-80"
        src={tile.image?.src}
        alt="No_Image_Selected"
        id={id}
        style={{
          height: `${tile.image?.h}%`,
          width: `${tile.image?.w}%`,
        }}
      />
    </div>
  );
}
