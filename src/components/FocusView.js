import React from "react";
import { AccordionDetails, ListItemText, IconButton } from "@mui/material";
import { setData } from "../utilities/firebase";
import QuantityByPerson from "./focusView/QuantityByPerson";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import DeleteIcon from "@mui/icons-material/Delete";

const FocusView = ({ item, user, usersInfo }) => {
  return (
    <AccordionDetails>
      {/* //notes */}
      <ListItemText>{item.notes}</ListItemText>
      {/* //add and subtract quantity //delete button */}
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo} />
      <IconButton
        aria-label="delete"
        size="small"
        onClick={!item.quantity[user['uid']]
          ? null : () => {
          setData(`/items/${item.name}`, null);
          // delete item;
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </AccordionDetails>
  );
};

const editNote = () => {
  // TODO: edit note
};

export default FocusView;
