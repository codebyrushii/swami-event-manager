import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Subscribe to URL search param changes so the hook re-renders when
 * `window.location.search` changes via pushState / replaceState / popstate.
 */
function subscribeToUrlChanges(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

function getSearch() {
  return typeof window !== "undefined" ? window.location.search : "";
}

/**
 * Lightweight hook to read/write named filters in the URL search params.
 * Uses browser history replaceState so filters survive page reloads.
 *
 * @param keys - list of param names to manage (must be stable — pass a const array)
 */
export function useUrlFilters<K extends string>(keys: readonly K[]) {
  const search = useSyncExternalStore(
    subscribeToUrlChanges,
    getSearch,
    () => "",
  );

  const filters = useMemo<Partial<Record<K, string>>>(() => {
    const params = new URLSearchParams(search);
    const result: Partial<Record<K, string>> = {};
    for (const key of keys) {
      const val = params.get(key);
      if (val !== null) result[key] = val;
    }
    return result;
  }, [search, keys]);

  const setFilter = useCallback((key: K, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash;
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of keys) {
      params.delete(key);
    }
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash;
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [keys]);

  return { filters, setFilter, clearFilters };
}
