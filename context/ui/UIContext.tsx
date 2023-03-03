import { createContext } from "react";
interface ContextProps {
  openSideMenu: () => void;
  closeSideMenu: () => void;
  sideMenuOpen: boolean;
}
export const UIContext = createContext({} as ContextProps);
