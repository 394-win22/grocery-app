import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { setData } from "../utilities/firebase";
import "../utilities/helperFunctions";
import "../App.css";
import { useUserState } from "../utilities/firebase.js";
import FocusView from "./FocusView";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import GroceryListItemText from "./groceryList/GroceryListItemText";

export default function OwnFilteredGroceryList({ items, users }) {
  if (!items) {
    items = {};
  }

  const [user] = useUserState();
  const [expanded, setExpanded] = React.useState(false);
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
        {Object.keys(items).map((key, index) => {
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
              <ListItemButton>
                <Accordion
                  expanded={expanded === index}
                  onChange={handleAccordionChange(index)}
                  sx={{
                    boxShadow: "none",
                    bgcolor: "rgba(255, 0, 0, 0);",
                    "&:hover": {
                      bgcolor: "rgba(255, 0, 0, 0);",
                    },
                  }}
                >
                  <AccordionSummary>
                    <GroceryListItemText
                      text={items[key].name}
                      labelId={labelId}
                      purchased={items[key].purchased}
                    />
                  </AccordionSummary>
                  <FocusView item={items[key]} user={user} usersInfo={users} />
                </Accordion>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                  }}
                >
                  <AddSubtractButtons user={user} item={items[key]} />
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(key)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
