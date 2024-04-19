import { MapTile } from "./MapTile";

export type MapContextType = {
  closeEditBar: () => void;
  showEditBar: boolean;
  editTile:
    | {
        id: string | undefined;
        tile: MapTile;
      }
    | undefined;
  setEditTile: React.Dispatch<
    React.SetStateAction<
      | {
          id: string | undefined;
          tile: MapTile;
        }
      | undefined
    >
  >;
};
