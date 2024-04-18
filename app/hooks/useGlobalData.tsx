import { useMatches } from "@remix-run/react";
import { GlobalData } from "~/types/GlobalData";

/**
 * Returns all the data that is set in the loader of the root route.
 * E.g. register, menu items, etc.
 */
export function useGlobalData(): GlobalData {
  const matches = useMatches();
  return matches[0].data as GlobalData;
}
