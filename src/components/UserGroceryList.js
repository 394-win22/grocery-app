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
  const checked = Object.keys(items)
    .map((key, index) => (items[key].purchased ? index : -1))
    .filter((index) => index != -1);
  
  var filtered_items = user ? Object.keys(items).filter(key => items[key].quantity[user['uid']] > 0) : Object.keys(items) ;

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
                display: "flex",
                justifyContent: "center",
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
