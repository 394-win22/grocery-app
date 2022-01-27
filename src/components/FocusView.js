import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Button from "@mui/material/Button";
import { ButtonGroup, Typography } from "@mui/material";
import { setData, delData } from "../utilities/firebase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemText from "@mui/material/ListItemText";
import QuantityByPerson from "./focusView/QuantityByPerson";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const FocusView = ({ item, user, usersInfo }) => {
  return (
    <AccordionDetails>
      {/* //notes */}
      <ListItemText>{item.notes}</ListItemText>
      {/* //add and subtract quantity //delete button */}
      <div className="show quantity">
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
                  const itemName = item.name;

                  // initialize quantity to zero for new user
                  if (!item.quantity[user.uid]) {
                    item.quantity[user.uid] = 0;
                  }

                  // either remove one quantity from user
                  if (item.quantity[user.uid] >= 1) {
                    item.quantity[user.uid] -= 1;
                  } else {
                    // or delete user from dictionary if quantity becomes zero
                    if (item.quantity[user.uid])
                      delete item.quantity[user.uid];
                  }

                  // check if quantity dictionay is empty, i.e. nobody wants the item
                  if (Object.keys(item.quantity).length > 0) {
                    // update quantity
                    setData(
                      `/items/${itemName}/quantity/${user.uid}`,
                      item.quantity[user.uid]
                    );
                  } else {
                    // remove item
                    setData(`/items/${itemName}`, null);
                    delete items[itemName]; // is this redundant/unneccessary
                  }
                }
            }
          >
            {" "}
            -{" "}
          </Button>
          <Button key="two" style={{ pointerEvents: "none" }}>
            {!item.quantity[user.uid] ? 0 : item.quantity[user.uid]}
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
                  const itemName = item.name;
                  if (!item.quantity[user.uid]) {
                    item.quantity[user.uid] = 0;
                  }
                  item.quantity[user.uid] += 1;
                  setData(
                    `/items/${itemName}/quantity/${user.uid}`,
                    item.quantity[user.uid]
                  );
                }
            }
          >
            {" "}
            +{" "}
          </Button>
        </ButtonGroup>
      </div>
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo} />
      <IconButton aria-label="delete" size="small" onClick={() => {
        setData(`/items/${item.name}`, null);
        // delete item;
      }}  >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </AccordionDetails>
  );
};

const editNote = () => {
  // TODO: edit note
};
export default FocusView;
