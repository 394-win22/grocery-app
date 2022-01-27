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
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import IconButton from "@mui/material/IconButton";
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
        onClick={() => {
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
