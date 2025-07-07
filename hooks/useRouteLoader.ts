"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/store/loadingStore";

export const useRouteLoader = () => {
  const pathname = usePathname();
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const isExternal = anchor.hostname !== window.location.hostname;

      // if it's a valid internal link
      if (href && !isExternal && !href.startsWith("#") && !href.startsWith("mailto:")) {
        setLoading(true);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setLoading]);

  // reset loading state when route finishes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);
};
