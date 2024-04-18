import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { MapTile } from "~/types";
import { MapContextType } from "~/types/MapContextType";

export const Ctx = createContext<MapContextType | undefined>(undefined);

export const useCtx = () => {
  const ctx = useContext(Ctx);
  if (ctx === undefined) throw new Error("Context is undefined");
  return ctx;
};

export const MapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editTile, setEditTile] = useState<{
    id: string | undefined;
    tile: MapTile;
    src?: string;
  }>();

  const showEditBar = useMemo(() => {
    return !!editTile?.id;
  }, [editTile?.id]);

  const closeEditBar = useCallback(() => {
    setEditTile(undefined);
  }, []);

  const value = useMemo(
    () => ({
      showEditBar,
      closeEditBar,
      editTile,
      setEditTile,
    }),
    [closeEditBar, editTile, showEditBar]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
