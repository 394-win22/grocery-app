import React, { useState } from "react";
import { IconButton, Button, TextField } from "@mui/material";
import { setData, useUserState } from "../utilities/firebase";
import AddIcon from "@mui/icons-material/Add";
import Drawer from '@mui/material/Drawer';
import "../App.css";

const AddNewItem = ({ user, groupId }) => {
  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [drawerState, setDrawerState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName && user) {
      addItem(itemName, user.uid, itemNote, groupId);
      setItemName("");
      setItemNote("");
      toggleDrawer(false);
    }
  };

  const addForm = () => (
    <form
    className="new-item"
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      justifyContent: "space-around",
      // backgroundColor: "#F0F0F0",
      padding: "10px",
      margin: "auto",
      height: "50%",
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
    <Button type="submit" variant="contained" onClick={toggleDrawer(false)}>
      Add
    </Button>
   </form>
  )
  return  (
  <React.Fragment key={"bottom"}> 
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
      onClick={toggleDrawer(true)}
    >
      <AddIcon style={{ color: "white" }} />
    </IconButton> 
    <Drawer
      anchor={"bottom"}
      open={drawerState}
      onClose={toggleDrawer(false)}>
      {addForm()}
    </Drawer>
  </React.Fragment>
  )
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
