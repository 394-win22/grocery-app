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
import "../utilities/helperFunctions";
import { sumDict } from "../utilities/helperFunctions";
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

  const deleteListItem = (itemName) => {
    delete items[itemName];
    setData(`/items/${itemName}`, null);
  };

  return !user ? (
    <></>
  ) : (
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
                            minWidth: "100px",
                          }
                        : { minWidth: "100px" }
                    } // font style
                    align="center"
                  >
                    {" "}
                    {items[key].name.length > 10
                      ? items[key].name.substring(0, 7) + "..."
                      : items[key].name}{" "}
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
                  onClick={
                    !user
                      ? null
                      : () => {
                          const itemName = key;
                          if (!items[itemName].quantity[user.uid]) {
                            items[itemName].quantity[user.uid] = 0;
                          }
                          if (items[itemName].quantity[user.uid] > 0) {
                            items[itemName].quantity[user.uid] -= 1;
                            setData(
                              `/items/${itemName}/quantity/${user.uid}`,
                              items[itemName].quantity[user.uid]
                            );
                          }
                          if (sumDict(items[itemName].quantity) <= 0) {
                            deleteListItem(itemName);
                          }
                        }
                  }
                >
                  {" "}
                  -{" "}
                </Button>
                <Button key="two" style={{ pointerEvents: "none" }}>
                  {!items[key].quantity[user.uid]
                    ? 0
                    : items[key].quantity[user.uid]}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={
                    !user
                      ? null
                      : () => {
                          const itemName = key;
                          if (!items[itemName].quantity[user.uid]) {
                            items[itemName].quantity[user.uid] = 0;
                          }
                          items[itemName].quantity[user.uid] += 1;
                          setData(
                            `/items/${itemName}/quantity/${user.uid}`,
                            items[itemName].quantity[user.uid]
                          );
                        }
                  }
                >
                  {" "}
                  +{" "}
                </Button>
              </ButtonGroup>

              <ListItemText
                disableTypography
                className="item-total-quantity"
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
                    {sumDict(items[key].quantity)}{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
