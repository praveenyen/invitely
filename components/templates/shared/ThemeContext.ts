import { createContext, useContext } from "react";
import type { Theme } from "@/lib/themes";

export const ThemeContext = createContext<Theme | null>(null);

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeWrapper");
  return ctx;
}
