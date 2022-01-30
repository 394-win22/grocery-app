import React from "react";
import { AccordionDetails, ListItemText, IconButton } from "@mui/material";
import { setData } from "../utilities/firebase";
import QuantityByPerson from "./focusView/QuantityByPerson";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";

const FocusView = ({ item, user, usersInfo }) => {
  const [editMode, setEditMode] = React.useState(false);
  const EditNote = () => {
    const [newNote, setNewNote] = React.useState(item.notes);
    const handleSubmit = (event) => {
      event.preventDefault();
      setData(`/items/${item.name}/notes/`, newNote);
      setNewNote("");
      setEditMode(false);
    };
    return (
      <form className="edit-note" onSubmit={handleSubmit}>
        <TextField
          style={{ display: "block", margin: "0px", padding: "0px" }}
          id="note-edit"
          variant="outlined"
          onInput={(e) => setNewNote(e.target.value)}
          value={newNote}
        />
        <Button
          type="submit"
          variant="text"
          style={{ display: "block", margin: "0px", padding: "0px" }}
        >
          Add Note
        </Button>
      </form>
    );
  };
  return (
    <AccordionDetails>
      {/* //notes */}
      {editMode ? (
        <EditNote />
      ) : (
        <>
          <Button
            variant="text"
            style={{ display: "block", margin: "0px", padding: "0px" }}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Note
          </Button>
        </>
      )}

      {/* //add and subtract quantity //delete button */}
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo} />
      <IconButton
        aria-label="delete"
        size="small"
        onClick={
          !item.quantity[user["uid"]]
            ? null
            : () => {
                setData(`/items/${item.name}`, null);
                // delete item;
              }
        }
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </AccordionDetails>
  );
};

export default FocusView;
