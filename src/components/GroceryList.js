import React, { useState } from "react";
import { Accordion, AccordionSummary } from "@mui/material";
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
import FocusView from "./FocusView";
import AddSubtractButtons from "./focusView/AddSubtractButtons";

export default function GroceryList({ items, users }) {
  if (!items) {
    items = {};
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(-1);

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
            <Accordion>
              <AccordionSummary>
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
                  <ListItemButton
                    onClick={() => {
                      // togglePopup();
                      setActiveKey(key);
                    }}
                  >
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
                    <AddSubtractButtons user={user} item={items[key]} />
                  </ListItemButton>
                </ListItem>
              </AccordionSummary>
              <FocusView item={items[key]} user={user} usersInfo={users} />
            </Accordion>
          );
        })}
      </List>
      {/* {isOpen && (
        <Popup
          item={items[activeKey]}
          handleClose={togglePopup}
          user={user}
          usersInfo={users}
        />
      )} */}
    </div>
  );
}
