// React
import { ChangeEvent, useContext, useEffect, useState } from "react";
// Context
import { EntriesContext, UIContext } from "@/context";
// MUI
import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setInputValue("");
    setIsAddingEntry(false);
    setTouched(false);
  };

  return (
    <>
      <Box marginBottom={2}>
        {isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              autoFocus
              multiline
              label="New entrie"
              helperText={inputValue.length <= 0 && touched && "Enter a value"}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur={() => setTouched(true)}
            />
            <Box display="flex" justifyContent="space-between">
              <Button variant="text" onClick={() => setIsAddingEntry(false)}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveIcon />}
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAddingEntry(true)}
          >
            Add new Task
          </Button>
        )}
      </Box>
    </>
  );
};
