import { createContext } from "react";
interface ContextProps {
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  startDragging: () => void;
  endDragging: () => void;
}
export const UIContext = createContext({} as ContextProps);
