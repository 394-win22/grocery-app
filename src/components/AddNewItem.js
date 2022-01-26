import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { setData, useUserState } from "../utilities/firebase";
import '../App.css'

const AddNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [user] = useUserState();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName && user) {
      addItem(itemName, user.uid, "Notes testing.");
      setItemName("");
    }
  };
  return !user ? <p className="sign-in-remind">Please sign in first</p> :(
    <form className="new-item" onSubmit={ handleSubmit}>
      <TextField
        style={{ display: "block", padding: "10px" }}
        id="item-name-input"
        variant="outlined"
        onInput={(e) => setItemName(e.target.value)}
        value={itemName}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
};

const addItem = (itemName, uid, note) => {
  const newItem = {
    name: itemName,
    quantity: {},
    total_quantity: 1,
    purchased: false,
    notes: note,
  };
  newItem["quantity"][uid] = 1;
  setData(`/items/${itemName}`, newItem);
};

export default AddNewItem;
