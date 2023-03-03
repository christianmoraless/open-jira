// React
import { ChangeEvent, useContext, useState } from "react";
// Context
import { EntriesContext } from "../../context/entries";
// MUI
import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
  };
  return (
    <>
      <Box marginBottom={2}>
        {isAdding ? (
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
              <Button variant="text" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveIcon />}
                onClick={onSave}>
                Save
              </Button>
            </Box>
          </>
        ) : (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAdding(true)}>
            Add new Task
          </Button>
        )}
      </Box>
    </>
  );
};
