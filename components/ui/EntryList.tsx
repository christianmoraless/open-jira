import { DragEvent, FC, useContext, useMemo } from "react";
import { EntryStatus } from "@/interfaces";
import { List, Paper } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { UIContext, EntriesContext } from "../../context/";
import styles from "./Entry.module.css";
interface Props {
  status: EntryStatus;
}
export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id);
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      style={{ minHeight: "100vh" }}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh-250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List
          sx={{ opacity: isDragging ? 0.2 : 1, transition: "all ease .3s" }}
        >
          {entriesByStatus.map((entry, index) => (
            <EntryCard key={index} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
