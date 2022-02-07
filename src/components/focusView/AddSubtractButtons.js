import React, {useRef} from "react";
import {sumDict} from "../../utilities/helperFunctions.js";
import {setData} from "../../utilities/firebase";
import {Button, ButtonGroup} from "@mui/material";
import {ConfirmDialog} from "../ConfirmDialog";

const AddSubtractButtons = ({user, item, groupId}) => {
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current.handleClickOpen();
  };

  return (
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
          disabled={item.purchased}
          onClick={
            !user
              ? null
              : () => {
                const itemName = item.name;
                // initialize quantity to zero for new user
                if (!item.quantity[user.uid]) {
                  return;
                }
                // If it has only one owner confirm before deleting the item
                if (Object.keys(item.quantity).length === 1 && item.quantity[user.uid] === 1) {
                  openDialog();
                  return;
                }
                //remove one quantity from user
                if (item.quantity[user.uid] > 1) {
                  item.quantity[user.uid] -= 1;
                } else {
                  delete item.quantity[user.uid];
                }
                // update quantity
                setData(
                  `/groups/${groupId}/items/${itemName}/quantity/`,
                  item.quantity
                );
              }
          }
        >
          {" "}
          -{" "}
        </Button>
        <Button disabled={item.purchased} style={{border: "0px"}}>
          {" "}
          {sumDict(item.quantity)}{" "}
        </Button>
        <Button
          variant="contained"
          style={{
            maxWidth: "30px",
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
          }} // Button size
          disabled={item.purchased}
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
                  `/groups/${groupId}/items/${itemName}/quantity/${user.uid}`,
                  item.quantity[user.uid]
                );
              }
          }
        >
          {" "}
          +{" "}
        </Button>
      </ButtonGroup>
      <ConfirmDialog
        title={"Subtract to zero?"}
        content={"If you do that, this item will be deleted."}
        func={() => {
          // delete item;
          setData(`/groups/${groupId}/items/${item.name}`, null);
        }}
        props={dialogRef}
      />
    </div>
  );
};

export default AddSubtractButtons;
