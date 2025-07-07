"use client";

import { useRouteLoader } from "@/hooks/useRouteLoader";

export default function RouterLoadingWrapper({ children }: { children: React.ReactNode }) {
  useRouteLoader();
  return <>{children}</>;
}
