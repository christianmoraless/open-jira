import { createContext } from "react";
interface ContextProps {
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
}
export const UIContext = createContext({} as ContextProps);
