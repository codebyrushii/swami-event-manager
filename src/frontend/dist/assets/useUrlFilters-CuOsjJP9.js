import { c as createLucideIcon, r as reactExports } from "./index-IJURbmmR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
      key: "ol2ft2"
    }
  ],
  ["path", { d: "m16.5 3.5 5 5", key: "15e6fa" }],
  ["path", { d: "m21.5 3.5-5 5", key: "m0lwru" }]
];
const FunnelX = createLucideIcon("funnel-x", __iconNode);
function subscribeToUrlChanges(cb) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}
function getSearch() {
  return typeof window !== "undefined" ? window.location.search : "";
}
function useUrlFilters(keys) {
  const search = reactExports.useSyncExternalStore(
    subscribeToUrlChanges,
    getSearch,
    () => ""
  );
  const filters = reactExports.useMemo(() => {
    const params = new URLSearchParams(search);
    const result = {};
    for (const key of keys) {
      const val = params.get(key);
      if (val !== null) result[key] = val;
    }
    return result;
  }, [search, keys]);
  const setFilter = reactExports.useCallback((key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "" || value === null || value === void 0) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "") + window.location.hash;
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
  const clearFilters = reactExports.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of keys) {
      params.delete(key);
    }
    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "") + window.location.hash;
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [keys]);
  return { filters, setFilter, clearFilters };
}
export {
  FunnelX as F,
  useUrlFilters as u
};
