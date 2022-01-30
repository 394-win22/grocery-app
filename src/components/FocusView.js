import React, {useRef} from "react";
import {AccordionDetails, ListItemText, IconButton, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog} from "@mui/material";
import {setData} from "../utilities/firebase";
import QuantityByPerson from "./focusView/QuantityByPerson";
import AddSubtractButtons from "./focusView/AddSubtractButtons";
import DeleteIcon from "@mui/icons-material/Delete";
import {ConfirmDialog} from "./ConfirmDialog";

const FocusView = ({item, user, usersInfo}) => {

  const dialogRef = useRef();

  const openDialog = () => {
    if (item.quantity[user['uid']]) {
      dialogRef.current.handleClickOpen();
    }
  }

  return (
    <AccordionDetails>
      {/* //notes */}
      <ListItemText>{item.notes}</ListItemText>
      {/* //add and subtract quantity //delete button */}
      {/* //who want what */}
      <QuantityByPerson quantityDict={item.quantity} usersInfo={usersInfo}/>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={openDialog}
      >
        <DeleteIcon fontSize="small"/>
      </IconButton>
      <ConfirmDialog
        title={"Delete this item?"}
        content={"If you delete this item, other friends will not be able to purchase it."}
        func={() => {
            setData(`/items/${item.name}`, null);
            // delete item;
          }}
        props={dialogRef}
      />

    </AccordionDetails>
  );
};

const editNote = () => {
  // TODO: edit note
};

export default FocusView;
