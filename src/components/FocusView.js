import React, { useRef } from "react";
import {
  AccordionDetails,
  ListItemText,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { setData } from "../utilities/firebase";
import QuantityByPerson from "./focusView/QuantityByPerson";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { ConfirmDialog } from "./ConfirmDialog";

const FocusView = ({ item, user, usersInfo, groupId, navValue }) => {
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current.handleClickOpen();
  };
  const [editMode, setEditMode] = React.useState(false);
  const EditNote = () => {
    const [newNote, setNewNote] = React.useState(item.notes);
    const handleSubmit = (event) => {
      event.preventDefault();
      setData(`/groups/${groupId}/items/${item.name}/notes/`, newNote);
      setNewNote("");
      setEditMode(false);
    };
    return (
      <form className="edit-note" onSubmit={handleSubmit}>
        <TextField
          style={{
            display: "block",
            margin: "0px",
            padding: "0px",
            width: "80%",
          }}
          id="note-edit"
          variant="standard"
          fullWidth
          onInput={(e) => setNewNote(e.target.value)}
          value={newNote}
          inputProps={{ maxLength: 40 }}
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
    navValue === 2?
      <></>:
    <AccordionDetails style={{ width: "298px", padding: "0" }}>
      {/* //notes */}
      {editMode ? (
        <EditNote />
      ) : (
        <Button
          variant="text"
          style={{ display: "block", margin: "0px", padding: "0px" }}
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit Note
        </Button>
      )}

      {/* //add and subtract quantity //delete button */}
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo} />
      <IconButton
        className="delete-icon"
        aria-label="delete"
        size="small"
        onClick={openDialog}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <ConfirmDialog
        title={"Delete this item?"}
        content={
          "If you delete this item, other friends will not be able to purchase it."
        }
        func={() => {
          setData(`/groups/${groupId}/items/${item.name}`, null);
          // delete item;
        }}
        props={dialogRef}
      />
    </AccordionDetails>
  );
};

export default FocusView;
