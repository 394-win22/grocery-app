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

const FocusView = ({ item, usersInfo }) => {
  return (
    <AccordionDetails>
      {/* //notes */}
      <ListItemText>{item.notes}</ListItemText>
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo} />
      {/* //add and subtract quantity //delete button */}
    </AccordionDetails>
  );
};

const editNote = () => {
  // TODO: edit note
};
export default FocusView;
