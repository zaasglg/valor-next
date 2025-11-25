"use client";

import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGamePage = pathname?.startsWith('/game/');
  
  return (
    <div className={isGamePage ? "pb-3 md:pb-0" : "pb-20 md:pb-0"}>
      {children}
    </div>
  );
}
