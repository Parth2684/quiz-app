"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LoadingOverlay() {
  const { loading, setLoading } = useLoadingStore();
  const pathname = usePathname();

  // turn off loader when route changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-md bg-black/40 transition-opacity duration-300 ${
        loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
}
