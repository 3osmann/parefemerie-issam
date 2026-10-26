"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * ScrollTrigger measures section heights at mount. Webfonts and lazy images
 * change those heights, so refresh after they settle (and after route changes).
 */
export function ScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timers = [window.setTimeout(refresh, 250), window.setTimeout(refresh, 1200)];
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", refresh);
    };
  }, [pathname]);

  return null;
}
