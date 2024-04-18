import { useState } from "react";
import { MapTile, ReworkTileButton } from "..";
import { useCtx } from "~/contexts/MapContext";
import { Transition } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { useGlobalData } from "~/hooks/useGlobalData";

export function GameMap() {
  const [gridSize, setGridSize] = useState({ rows: 6, columns: 6 });
  const [tileImage, setTileImage] = useState<string | undefined>();
  const { showEditBar, closeEditBar, editTile, setEditTile } = useCtx();
  const { Images } = useGlobalData();

  const calculateAdjustedGridSize = (nextGridSize: number) => {
    const newRows = Math.round(10 * nextGridSize);
    const newColumns = Math.round(10 * nextGridSize);
    return { rows: newRows, columns: newColumns };
  };

  const handleResize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextGridSize = parseFloat(event.target.value);
    const adjustedSize = calculateAdjustedGridSize(nextGridSize);
    setGridSize(adjustedSize);
  };

  const moveTile = (deltaX: number, deltaY: number) => {
    if (!editTile) return;
    setEditTile(() => ({
      ...editTile,
      tile: {
        ...editTile.tile,
        x: editTile.tile.x + deltaX,
        y: editTile.tile.y + deltaY,
      },
    }));
  };

  const rotateTile = (deg: number) => {
    if (!editTile) return;
    setEditTile(() => ({
      ...editTile,
      id: editTile?.id,
      tile: {
        ...editTile.tile,
        rotation: editTile.tile.rotation + deg,
      },
    }));
  };
  return (
    <div className="h-full">
      <label htmlFor="gridRange">Grid Size:</label>
      <input
        type="range"
        id="gridRange"
        min="0.1"
        max="2"
        step="0.1"
        defaultValue={1.0}
        onChange={handleResize}
      />
      <div
        id="mainMap"
        className="min-h-full min-w-full border-solid border border-black"
        style={{
          width: `${gridSize.columns * 240}px`,
          height: `${gridSize.rows * 240}px`,
        }}
      >
        {Array.from({ length: gridSize.rows }, (_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: gridSize.columns }, (_, col) => (
              <MapTile key={col} id={col + "," + row} img={editTile?.src} />
            ))}
          </div>
        ))}
      </div>
      <Transition
        show={showEditBar}
        enter="transition-transform duration-300 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300 ease-in"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-md z-50"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className=" items-center p-4 font-bold">{editTile?.id}</h1>

          <div className="flex-col">
            <h2>Import a Tile Image</h2>
            <select
              className="border-2 rounded-md"
              id="importTile"
              onChange={(e) => setTileImage(e.currentTarget.value)}
              value={Images.find((img) => img.src === editTile?.src)?.src}
            >
              <option value={undefined}></option>
              {Images.map((img) => (
                <option key={img.name} value={img.src}>
                  {img.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <button onClick={() => rotateTile(-90)}>
              Rotate left
              <ArrowUturnLeftIcon
                className="ml-auto mr-auto"
                height={40}
                width={40}
              />
            </button>
            <button onClick={() => rotateTile(90)}>
              Rotate right
              <ArrowUturnRightIcon
                className="ml-auto mr-auto"
                height={40}
                width={40}
              />
            </button>
          </div>
          <div className="text-center">
            <ReworkTileButton
              onClick={() => moveTile(0, -1)}
              content={"Move tile up"}
              icon={
                <ArrowUpCircleIcon
                  className="ml-auto mr-auto"
                  height={60}
                  width={60}
                />
              }
            />

            <div className="flex">
              <button onClick={() => moveTile(-1, 0)}>
                <ArrowLeftCircleIcon /> Move tile left
              </button>
              <p className="self-center">
                {editTile?.tile.x + "  " + editTile?.tile.y}
              </p>
              <button onClick={() => moveTile(1, 0)}>
                <ArrowRightCircleIcon /> Move tile right
              </button>
            </div>
            <button onClick={() => moveTile(0, 1)}>
              <ArrowDownCircleIcon /> Move tile down
            </button>
          </div>
          <button
            onClick={() => {
              if (!editTile) return;
              setEditTile(() => ({
                ...editTile,
                id: editTile.id,
                src: tileImage,
                tile: editTile.tile,
              }));
            }}
          >
            save
          </button>
          <button onClick={closeEditBar}> close</button>
        </div>
      </Transition>
    </div>
  );
}
