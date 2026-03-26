"use client";
import { useEffect } from "react";
import { incrementViewCount } from "@/app/actions/invitation";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const isOwner = sessionStorage.getItem(`stats_${slug}`) === "1";
    if (isOwner) return;

    let counted = false;

    const onScroll = () => {
      if (counted) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      if (window.scrollY / total >= 0.5) {
        counted = true;
        incrementViewCount(slug).catch(() => {});
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
