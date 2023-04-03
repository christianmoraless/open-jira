import { FC, useReducer } from "react";
import { uiReducer, UIContext } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}
export const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
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
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - AddingEntry", payload: isAdding });
  };
  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };
  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
