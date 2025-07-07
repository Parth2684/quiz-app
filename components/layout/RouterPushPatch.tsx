"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/loadingStore";

export default function RouterPushPatch({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    // Backup original push
    const originalPush = router.push.bind(router);

    // Patch it
    (router as any).push = (...args: Parameters<typeof originalPush>) => {
      setLoading(true);
      return originalPush(...args);
    };

    return () => {
      (router as any).push = originalPush;
    };
  }, [router, setLoading]);

  return <>{children}</>;
}
