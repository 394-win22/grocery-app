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
import Popup from "./Popup"

export default function GroceryList({ items }) {

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  } 

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

  return !user ? (
    <></>
  ) : (
    <div>
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
            <ListItemButton onClick={togglePopup}>
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
                              `/items/${itemName}/total_quantity`,
                              sumDict(items[itemName].quantity)
                            );
                            setData(
                              `/items/${itemName}/quantity/${user.uid}`,
                              items[itemName].quantity[user.uid]
                            );
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
                            `/items/${itemName}/total_quantity`,
                            sumDict(items[itemName].quantity)
                          );
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
                    {items[key].total_quantity}{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    {isOpen && <Popup
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
    
    </div>
  );
}
