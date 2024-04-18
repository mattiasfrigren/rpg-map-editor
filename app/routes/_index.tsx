import { GameMap } from "~/components/Map/GameMap";
import { MapContextProvider } from "~/contexts/MapContext";

export default function Index() {
  return (
    <MapContextProvider>
      <GameMap />;
    </MapContextProvider>
  );
}
