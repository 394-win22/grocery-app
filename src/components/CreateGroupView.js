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


export default function CreateGroupView ({userList, currentUser}) {
    
}