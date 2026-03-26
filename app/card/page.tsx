"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InvitationData, INVITATION_STORAGE_KEY } from "@/types/invitation";
import CardView from "@/components/card/CardView";

export default function CardPage() {
  const router = useRouter();
  const [data] = useState<InvitationData | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(INVITATION_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as InvitationData;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!data) router.replace("/create");
  }, [data, router]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(36_30%_95%)]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-[#B8932A] border-t-transparent"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p className="text-sm text-[#7A5C3A]">Preparing your invitation…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <CardView data={data} />;
}
