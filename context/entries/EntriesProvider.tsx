import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from ".";
import { entriesApi } from "@/api";
import { Description } from "@mui/icons-material";
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

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", description);
    dispatch({
      type: "[Entry] Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async ({ _id, description, status }) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({
        type: "[Entry] Updated-Entry",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      dispatch({ type: "[Entry] Refresh-Data", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshEntries();
  });

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
