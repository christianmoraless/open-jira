import { FC, useReducer } from "react";
import { uiReducer, UIContext } from "./";

export interface UIState {
  sideMenuOpen: boolean;
}
export const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};
interface Props {
  children: React.ReactNode;
}
export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => {
    dispatch({ type: "UI - OpenSidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI - CloseSidebar" });
  };
  return (
    <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
