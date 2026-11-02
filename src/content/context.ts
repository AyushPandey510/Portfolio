import { createContext } from "react";
import type { CaseContent } from "./cases";

// Filled during prerendering so case pages render their full article on the server.
export const CaseContentContext = createContext<Record<string, CaseContent> | null>(null);
