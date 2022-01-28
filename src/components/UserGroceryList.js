import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { setData } from "../utilities/firebase";
import "../utilities/helperFunctions";
import "../App.css";
import { useUserState } from "../utilities/firebase.js";

export default function UserGroceryList({ items, users }) {
  if (!items) {
    items = {};
  }

  const [user] = useUserState();  
  console.log(user)

  // Need to toggle lines 34 and 33 for uid issue
  //var filtered_items = Object.keys(items).filter(key => items[key].quantity[user['uid']] > 0);
   var filtered_items  = Object.keys(items)

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return !user ? (
    <></>
  ) : (
    <div>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {filtered_items.map((key, index) => {
          const labelId = `checkbox-list-secondary-label-${items[key].name}`;
          return (
            <ListItem
              className="item-list"
              key={index}
              disablePadding
              sx={{
                alignItems: "space-between",
                padding: 0,
              }}
            >
              <ListItemText
              primary={key}
              secondary={items[key].quantity[user['uid']]}
            />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
