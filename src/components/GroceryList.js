import React, {useEffect, useState} from "react";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

//TODO:
//disable accordion (need to fix: for plan it is disabled)
//render only the number of items the individual purchased in summary state
//disable strikethrough when in summary state

export default function GroceryList({
  items,
  users,
  navValue,
  groupId,
  summaryUser,
}) {
  if (!items) {
    items = {};
  }

  const [user] = useUserState();
  const [expanded, setExpanded] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);

  const handleToggle = (key) => () => {
    if (items[key].purchased == false) {
      setData(`/groups/${groupId}/items/${key}/purchased`, true);
    } else {
      setData(`/groups/${groupId}/items/${key}/purchased`, false);
    }
  };

  useEffect(() => {
    closeAllAccordion();
  }, [navValue])

  const closeAllAccordion = () =>{
    setExpanded("");
  }

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

  const myComparator = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a == b) return 0;
    return a < b ? -1 : 1;
  }
  //Conditional for whether user is in shop view. If so, never filter
  var filtered_items = Object.keys(items).sort(myComparator);
  if (navValue === 0) {
    if (filtered) {
      filtered_items = Object.keys(items)
      .filter((key) => items[key].quantity[user["uid"]] >= 0)
      .sort(myComparator)
    } 
  } 
  if (navValue === 1) {
    filtered_items = Object.keys(items).sort(myComparator);
  }
  if (navValue === 2) {
    filtered_items = Object.keys(items).filter(
      (key) =>
        items[key].quantity[summaryUser] >= 0 && items[key].purchased
    )
    .sort(myComparator);
  }

  const checked = filtered_items.map((key, index) => (items[key].purchased ? index : -1))
  .filter((index) => index != -1);

  return !user ? (
    <></>
  ) : (
    <div
      className="inner-list"
      style={{
        marginBottom: "50px",
        marginTop: "8px",
        width: "100%",
      }}
    >
      {navValue === 0 ? (
        <FormGroup style={{ alignItems: "center"}}>
          <FormControlLabel
            control={
              <Checkbox onChange={handleFilterToggle()} checked={filtered} />
            }
            label="Show my items only"
          />
        </FormGroup>
      ) : (
        <></>
      )}
      <List
        dense
        sx={{ width: "100%", bgcolor: "background.paper", overflow: "hidden", paddingBottom: "100px" }}
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
                      style={ navValue !== 0 ? { width: "200px", background: "none", pointerEvents: "none"} : { width: "200px", background: "none"}}
                    >
                      <AccordionSummary sx={{ padding: "0" }}>
                        <div>
                          <GroceryListItemText
                            text={items[key].name}
                            labelId={labelId}
                            purchased={items[key].purchased}
                            style={{ width: "100%" }}
                            navValue={navValue}
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
                        groupId={groupId}
                        isSharedList={true}
                        navValue = {navValue}
                        
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
                        <AddSubtractButtons
                          user={user}
                          item={items[key]}
                          groupId={groupId}
                          filtered={filtered}
                        />
                      ) : (
                        <div style={{"alignItems": "center", "display": "flex", "justifyContent": "center"}}>
                          <span style={{"minWidth": "25px", "display": "block"}}>
                          {sumDict(items[key].quantity)}
                          </span>
                          { navValue === 2 ? <></> : (
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(key)}
                            checked={checked.indexOf(index) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />)}
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


    </div>
  );
}
