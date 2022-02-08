import React, { useState, useRef } from "react";
import { IconButton, Button, TextField } from "@mui/material";
import { setData, useUserState } from "../utilities/firebase";
import AddIcon from "@mui/icons-material/Add";
import Drawer from '@mui/material/Drawer';
import "../App.css";
import {ConfirmDialog} from "./ConfirmDialog.js";

const AddNewItem = ({ user, groupId, items }) => {
  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [drawerState, setDrawerState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current.handleClickOpen();
  };

  const addItem = (itemName, uid, note, groupId, items) => {
    if (items && Object.keys(items).includes(itemName)) {
      openDialog();
    } else {
      const newItem = {
        name: itemName,
        quantity: {},
        total_quantity: 1,
        purchased: false,
        notes: note,
      };
      newItem["quantity"][uid] = 1;
      setData(`groups/${groupId}/items/${itemName}`, newItem);
      setItemName("");
      setItemNote("");
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName && user) {
      addItem(itemName, user.uid, itemNote, groupId, items);
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
      paddingBottom: "30px",
      margin: "auto",
      height: "50%",
    }}
  >
    <div style={{ width: "60%" }}>
      <TextField
        size="small"
        style={{ width: "100%", padding: "6px" }}
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
        style={{ padding: "6px", width: "100%" }}
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
        marginBottom: "20px",
      }}
      onClick={toggleDrawer(true)}
    >
      <AddIcon style={{ color: "white" }} />

    </IconButton> 
    <ConfirmDialog
        title={"Adding item that already exists?"}
        content={"If you do that, this item's quantity will plus 1 and note will be overwritten"}
        func={() => {
          let newQuantity = 1;
        if (user.uid in items[itemName].quantity) {
          newQuantity = items[itemName].quantity[user.uid] + 1;
        }
        setData(
          `groups/${groupId}/items/${itemName}/quantity/${user.uid}/`,
          newQuantity
        );
        setData(
          `groups/${groupId}/items/${itemName}/total_quantity`,
          items[itemName].total_quantity + 1
        );
        setData(`groups/${groupId}/items/${itemName}/notes`, itemNote);
        setItemName("");
        setItemNote("");
        }}
        props={dialogRef}
      />
    <Drawer
      anchor={"bottom"}
      open={drawerState}
      onClose={toggleDrawer(false)}>
      {addForm()}
    </Drawer>
    
  </React.Fragment>
  )
};



export default AddNewItem;