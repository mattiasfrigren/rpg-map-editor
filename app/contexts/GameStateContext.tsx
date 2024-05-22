import { createContext, useContext, useMemo, useState } from "react";
import { GameState } from "~/types";

export const Ctx = createContext<GameState | undefined>(undefined);

export const useGameStateContext = () => {
  const ctx = useContext(Ctx);
  if (ctx === undefined) throw new Error("Context is undefined");
  return ctx;
};

export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGameMode, setIsGameMode] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isGameMode,
      setIsGameMode,
    }),
    [isGameMode, setIsGameMode]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
