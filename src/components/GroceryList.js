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

export default function GroceryList({ items, users, navValue }) {
  if (!items) {
    items = {};
  }

  const [user] = useUserState();
  const [expanded, setExpanded] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
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

  const handleFilterToggle = () => () => {
    if (filtered === false) {
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Conditional for whether user is in shop view. If so, never filter

  var filtered_items =
    filtered && navValue === 0
      ? Object.keys(items).filter(
          (key) => items[key].quantity[user["uid"]] >= 0
        )
      : Object.keys(items);

  return !user ? (
    <></>
  ) : (
    <div
      style={{
        marginBottom: "50px",
        marginTop: "8px",
        width: "100%",
      }}
    >
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
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
              <div style={{ width: "100%" }}>
                <div>
                  <ListItemButton sx={{ justifyContent: "center" }}>
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
                      style={{ width: "200px" }}
                    >
                      <AccordionSummary sx={{ padding: "0" }}>
                        <div>
                          <GroceryListItemText
                            text={items[key].name}
                            labelId={labelId}
                            purchased={items[key].purchased}
                            style={{ width: "100%" }}
                          />
                          <ListItemText
                            style={{ color: "grey", align: "left" }}
                          >
                            {items[key].notes}
                          </ListItemText>
                        </div>
                      </AccordionSummary>
                      <FocusView
                        item={items[key]}
                        user={user}
                        usersInfo={users}
                        isSharedList={true}
                      />
                    </Accordion>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-start",
                        marginTop: "13px",
                        width: "98px",
                      }}
                    >
                      {navValue === 0 ? (
                        <AddSubtractButtons user={user} item={items[key]} />
                      ) : (
                        <div>
                          {sumDict(items[key].quantity)}
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(key)}
                            checked={checked.indexOf(index) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </div>
                      )}
                    </div>
                  </ListItemButton>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #d3d3d3",
                    width: "80%",
                    margin: "auto",
                  }}
                ></div>
              </div>
            </ListItem>
          );
        })}
      </List>

      {navValue === 0 ? (
        <FormGroup style={{ alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox onChange={handleFilterToggle()} checked={filtered} />
            }
            label="Filter by user items"
          />
        </FormGroup>
      ) : (
        <></>
      )}
    </div>
  );
}
