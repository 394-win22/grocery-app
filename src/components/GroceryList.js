import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ButtonGroup, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddNewItem from "./AddNewItem";
import { setData, delData } from "../utilities/firebase";
import "../utilities/removeByIndex";
import removeByIndex from "../utilities/removeByIndex";
import "../App.css";
import { useUserState } from "../utilities/firebase.js";

export default function GroceryList({ items }) {
  // const [checked, setChecked] = useState(
  //   items
  //     .map((item, index) => (item.purchased ? index : -1))
  //     .filter((index) => index != -1)
  // );
  const [user] = useUserState();
  const checked = Object.keys(items)
    .map((key, index) => (items[key].purchased ? index : -1))
    .filter((index) => index != -1);

  const handleToggle = (key) => () => {
    if (items[key].purchased == false) {
      setData(`/items/${key}/purchased`, true);
    } else {
      setData(`/items/${key}/purchased`, false);
    }
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {Object.keys(items).map((key, index) => {
        const labelId = `checkbox-list-secondary-label-${items[key].name}`;
        return (
          <ListItem
            className="item-list"
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(key)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${items[key].name}`}
                  src={`/static/images/avatar/${items[key].name}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                id={labelId}
                primary={
                  <Typography
                    type="body1"
                    style={
                      items[key].purchased
                        ? {
                            /*fontFamily: 'cursive'*/
                            textDecoration: "line-through",
                            color: "lightgray",
                          }
                        : {}
                    } // font style
                    align="center"
                  >
                    {" "}
                    {items[key].name}{" "}
                  </Typography>
                }
              />
              <ButtonGroup size="small" aria-label="small button group">
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={!user ? null : () =>{
                      const itemName = key;
                      const total_quantity = items[key].total_quantity;
                      const uid = user.uid;
                      const user_quantity = items[key].quantity[user.uid];
                      if (!user_quantity) {
                        return null;
                      } else {
                        return changeQuantity(itemName, total_quantity - 1, uid, user_quantity - 1);
                      }
                    }
                  }
                >
                  {" "}
                  -{" "}
                </Button>
                <Button key="two" style={{ pointerEvents: "none" }}>
                  {items[key].total_quantity}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={!user ? null :() =>{
                      const itemName = key;
                      const total_quantity = items[key].total_quantity;
                      const uid = user.uid;
                      const user_quantity = items[key].quantity[user.uid];
                      if (!user_quantity) {
                        return changeQuantity(itemName, total_quantity + 1, uid, 1);
                      } else {
                        return changeQuantity(itemName, total_quantity + 1, uid, user_quantity + 1);
                      }
                    }
                  }
                >
                  {" "}
                  +{" "}
                </Button>
              </ButtonGroup>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

const changeQuantity = (itemName, total_quantity, uid, user_quantity) => {
  if (total_quantity <= 0) {
    setData(`/items/${itemName}`, null);
  } else if (user_quantity <= 0){
    setData(`/items/${itemName}/total_quantity`, total_quantity);
    setData(`/items/${itemName}/quantity/${uid}`, null);
  } else {
    setData(`/items/${itemName}/total_quantity`, total_quantity);
    setData(`/items/${itemName}/quantity/${uid}`, user_quantity);
  }
};
