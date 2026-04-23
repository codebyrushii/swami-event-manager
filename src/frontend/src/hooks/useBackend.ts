import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";

/**
 * Hook to access the backend actor directly.
 * Use the more specific hooks in useQueries.ts for data fetching.
 */
export function useBackend() {
  return useActor(createActor);
}
