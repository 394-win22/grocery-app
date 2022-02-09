import React, {useState} from "react";
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
  TextField, Grid,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {setData} from "../utilities/firebase";
import "../utilities/helperFunctions";
import "../App.css";
import {useUserState} from "../utilities/firebase.js";
import FocusView from "./FocusView";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import GroceryListItemText from "./groceryList/GroceryListItemText";
import {sumDict} from "../utilities/helperFunctions.js";

export default function CreateGroupView({userList, groupList, currentUser}) {
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
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "100px 10% 0px 10%"
      }}>
        <p style={{fontWeight: "bold"}}>Don't have a group?</p>
        <Button variant="contained" onClick={handleCreate} style={{minWidth: "160px", maxWidth: "160px"}}>
          Create a group
        </Button>
      </div>
      <h5>OR</h5>
      <form
        className="join_group"
        onSubmit={handleJoin}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 10% 0px 10%"
        }}
      >

        <div style={{textAlign: "left", width: "60%"}}>
          <TextField
            size="small"
            style={{width: "80%"}}
            id="item-name-input"
            variant="outlined"
            onInput={(e) => setjoinCode(e.target.value)}
            value={joinCode}
            placeholder="Join Code"
            inputProps={{maxLength: 20}}
            variant="standard"
          />
        </div>
        <Button type="submit" variant="contained" style={{minWidth: "160px"}}>
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
