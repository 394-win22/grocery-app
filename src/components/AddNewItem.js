import React, { useState } from "react";
import { IconButton, Button, TextField } from "@mui/material";
import { setData, useUserState } from "../utilities/firebase";
import { ConfirmDialog } from "./ConfirmDialog";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";

const AddNewItem = ({ user, groupId }) => {
  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [expandedView, setExpandedView] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName && user) {
      addItem(itemName, user.uid, itemNote, groupId);
      setItemName("");
      setItemNote("");
      handleClose();
      // console.log(expandedView);
    }
  };

  const handleClose = (event) => {
    setExpandedView(false);
  }
  const handleExpand = (event) => {
    event.preventDefault();
    setExpandedView(true);
  };
  return !expandedView ? (
    <IconButton
      style={{
        display: "flex",
        justifySelf: "left",
        borderRadius: "100%",
        height: "50px",
        width: "50px",
        backgroundColor: "#1976d2",
        marginRight: "20px",
        marginBottom: "20px",
      }}
      onClick={handleExpand}
    >
      <AddIcon style={{ color: "white" }} />
    </IconButton>
  ) : (
    <form
      className="new-item"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "space-around",
        // backgroundColor: "#F0F0F0",
        padding: "10px",
        margin: "auto",
      }}
    >
      <div style={{ width: "60%" }}>
        <TextField
          size="small"
          style={{ padding: "1", width: "100%" }}
          id="item-name-input"
          variant="outlined"
          onInput={(e) => setItemName(e.target.value)}
          value={itemName}
          placeholder="Item"
          inputProps={{ maxLength: 20 }}
          variant="standard"
        />
        <TextField
          size="small"
          style={{ padding: "1", width: "100%" }}
          id="item-note-input"
          variant="standard"
          placeholder="Notes (optional)"
          onInput={(e) => setItemNote(e.target.value)}
          value={itemNote}
          inputProps={{ maxLength: 40 }}
        />
      </div>
      <Button type="submit" variant="contained">
        Add
      </Button>
      <Button variant="outlined" onClick={handleClose}>Cancel</Button>
    </form>
  );
};

const addItem = (itemName, uid, note, groupId) => {
  const newItem = {
    name: itemName,
    quantity: {},
    total_quantity: 1,
    purchased: false,
    notes: note,
  };
  newItem["quantity"][uid] = 1;
  setData(`groups/${groupId}/items/${itemName}`, newItem);
};

export default AddNewItem;
