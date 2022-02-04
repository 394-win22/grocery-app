import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  FormGroup,
  Button,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { setData } from "../utilities/firebase";
import "../utilities/helperFunctions";
import "../App.css";
import { useUserState } from "../utilities/firebase.js";
import FocusView from "./FocusView";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import GroceryListItemText from "./groceryList/GroceryListItemText";
import { sumDict } from "../utilities/helperFunctions.js";

export default function CreateGroupView({ userList, groupList, currentUser }) {
  const [joinCode, setjoinCode] = useState("");
  const handleCreate = (event) => {
    event.preventDefault();
    if (currentUser) {
      createGroup(currentUser.uid, groupList);
    }
  };
  const handleJoin = (event) => {
    event.preventDefault();
    if (currentUser && groupList.hasOwnProperty(joinCode)) {
      console.log(groupList);
      joinGroup(currentUser.uid, joinCode);
    }
  };
  // console.log(currentUser.uid);
  return (
    <>
      <Button onClick={handleCreate} style={{ paddingTop: "100px" }}>
        Create a group
      </Button>
      <form
        className="join_group"
        onSubmit={handleJoin}
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
            onInput={(e) => setjoinCode(e.target.value)}
            value={joinCode}
            placeholder="Join Code"
            inputProps={{ maxLength: 20 }}
            variant="standard"
          />
        </div>
        <Button type="submit" variant="contained">
          Join Group
        </Button>
      </form>
    </>
  );
}

const createGroup = (userId, groupList) => {
  let hri = require("human-readable-ids").hri;
  // const groupId = Math.random().toString(36).substr(2, 10);
  let groupId = hri.random();
  while (groupId in groupList) {
    groupId = hri.random();
  }
  console.log(userId);
  setData(`users/${userId}/group_id`, groupId);
  const newGroup = {
    group_id: groupId,
    group_items: [],
  };
  setData(`groups/${groupId}`, newGroup);
};

const joinGroup = (userId, joinCode) => {
  setData(`users/${userId}/group_id`, joinCode);
};
