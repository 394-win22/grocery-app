import React, { useState, useRef } from "react";
import { IconButton, Button, TextField } from "@mui/material";
import { getDatabase } from "@firebase/database";
import { setData, useUserState} from "../utilities/firebase";
import { ConfirmDialog } from "./ConfirmDialog";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";



const AddNewItem = ({ user, groupId, items }) => {
  
  const dialogRef = useRef();

  const openDialog = () => {
    
    dialogRef.current.handleClickOpen();
    
  };

  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [expandedView, setExpandedView] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName && user) {
      addItem(itemName, user.uid, itemNote, groupId, items);
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
  const addItem = (itemName, uid, note, groupId, items) => {
  
    if (Object.keys(items).includes(itemName)) {
      let newQuantity = 1;
      
      if (uid in items[itemName].quantity) {
        openDialog();
      }
      setData(
        `groups/${groupId}/items/${itemName}/quantity/${uid}/`,
        newQuantity
      );
      setData(
        `groups/${groupId}/items/${itemName}/total_quantity`,
        items[itemName].total_quantity + 1
      );
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
    }
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
    <><form
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
      <ConfirmDialog
    title={"Item already in list"}
    content={"Confirm to add 1 to existing item in list."}
    func={() => {
      setData(items[itemName].quantity[uid] + 1);
      // delete item;
    }}
    props={dialogRef}
  />
    </form>
    </>
  );
};




export default AddNewItem;
