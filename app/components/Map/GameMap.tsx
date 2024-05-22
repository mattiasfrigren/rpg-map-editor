import { useState } from "react";
import { EditTileBar, MapTile } from "..";
import { useCtx } from "~/contexts/MapContext";

export function GameMap() {
  const [gridSize, setGridSize] = useState({ rows: 6, columns: 6 });
  const { editTile } = useCtx();
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

  return (
    <div className="h-full">
      <div className="inline-flex items-center gap-2">
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
      </div>
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
              <MapTile
                key={col}
                id={col + "," + row}
                img={editTile?.tile.image?.src}
              />
            ))}
          </div>
        ))}
      </div>
      <EditTileBar />
    </div>
  );
}
