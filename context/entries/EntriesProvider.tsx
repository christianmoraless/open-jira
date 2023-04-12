import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from ".";
export interface EntriesState {
  entries: Entry[];
}
export const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};
interface Props {
  children: React.ReactNode;
}
export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({
      type: "[Entry] Add-Entry",
      payload: newEntry,
    });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: "[Entry] Updated-Entry",
      payload: entry,
    });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
