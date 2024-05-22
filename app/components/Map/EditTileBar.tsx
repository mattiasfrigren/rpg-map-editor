import { Transition } from "@headlessui/react";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowUpCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import { Images } from "~/images/Walls";
import { ReworkTileButton } from "../ReworkTileButton";
import { useCtx } from "~/contexts/MapContext";
import { useState } from "react";
import { MapTile } from "~/types";

export function EditTileBar() {
  const [tileImage, setTileImage] = useState<string | undefined>();

  const { showEditBar, closeEditBar, editTile, setEditTile } = useCtx();
  const iconCls = "ml-auto mr-auto";

  const updateEditTile = (updateFunction: (prevTile: MapTile) => MapTile) => {
    if (!editTile) return;
    setEditTile({
      ...editTile,
      tile: updateFunction(editTile.tile),
    });
  };

  const moveTile = (deltaX: number, deltaY: number) => {
    updateEditTile((prevTile) => ({
      ...prevTile,
      x: prevTile.x + deltaX,
      y: prevTile.y + deltaY,
    }));
  };

  const rotateTile = (deg: number) => {
    updateEditTile((prevTile) => ({
      ...prevTile,
      rotation: prevTile.rotation + deg,
    }));
  };

  const adjustImageSize = (height: number, width: number) => {
    updateEditTile((prevTile) => {
      if (!prevTile.image) return prevTile;
      return {
        ...prevTile,
        image: { ...prevTile.image, h: height, w: width },
      };
    });
  };
  return (
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
        <h1 className=" items-center p-4 font-bold">{editTile?.id ?? "X,X"}</h1>

        <div className="flex-col">
          <h2>Import a Tile Image</h2>
          <select
            className="border-2 rounded-md"
            id="importTile"
            onChange={(e) => setTileImage(e.currentTarget.value)}
            value={
              Images.find((img) => img.src === editTile?.tile.image?.src)?.src
            }
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
            <ArrowUturnLeftIcon className={iconCls} height={40} width={40} />
          </button>
          <button onClick={() => rotateTile(90)}>
            Rotate right
            <ArrowUturnRightIcon className={iconCls} height={40} width={40} />
          </button>
        </div>
        <div className="text-center">
          <ReworkTileButton
            onClick={() => moveTile(0, -1)}
            content={"Move tile up"}
            icon={
              <ArrowUpCircleIcon className={iconCls} height={60} width={60} />
            }
          />

          <div className="flex">
            <ReworkTileButton
              onClick={() => moveTile(-1, 0)}
              content={"Move tile left"}
              icon={
                <ArrowLeftCircleIcon
                  className={iconCls}
                  height={60}
                  width={60}
                />
              }
            />
            <p className="self-center">
              {"X:" + (editTile?.tile.x ?? 0) + " Y:" + (editTile?.tile.y ?? 0)}
            </p>
            <ReworkTileButton
              onClick={() => moveTile(1, 0)}
              content="Move tile right"
              icon={
                <ArrowRightCircleIcon
                  className={iconCls}
                  height={60}
                  width={60}
                />
              }
            />
          </div>
          <ReworkTileButton
            onClick={() => moveTile(0, 1)}
            content="Move tile down"
            icon={
              <ArrowDownCircleIcon className={iconCls} height={60} width={60} />
            }
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <label htmlFor="imageHeight">
            Image height: {editTile?.tile.image?.h ?? 100}%
          </label>
          <input
            disabled={!editTile?.tile.image}
            type="range"
            id="imageHeight"
            min={50}
            max={135}
            step={1}
            value={editTile?.tile.image?.h ?? 100}
            onChange={(e) =>
              adjustImageSize(
                parseInt(e.target.value),
                editTile?.tile.image?.w ?? 100
              )
            }
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <label htmlFor="imageWidth">
            Image width: {editTile?.tile.image?.w ?? 100}%
          </label>
          <input
            disabled={!editTile?.tile.image}
            type="range"
            id="imageWidth"
            min={50}
            max={135}
            step={1}
            value={editTile?.tile.image?.w ?? 100}
            onChange={(e) =>
              adjustImageSize(
                editTile?.tile.image?.h ?? 100,
                parseInt(e.target.value)
              )
            }
          />
        </div>
        <button
          onClick={() => {
            if (!editTile) return;
            setEditTile(() => ({
              ...editTile,
              id: editTile.id,
              tile: {
                ...editTile.tile,
                image: {
                  ...editTile.tile.image,
                  src: tileImage,
                  name:
                    Images.find((img) => img.src === tileImage)?.name ??
                    "No_Image_Found",
                },
              },
            }));
          }}
        >
          save
        </button>
        <button onClick={closeEditBar}> close</button>
      </div>
    </Transition>
  );
}
