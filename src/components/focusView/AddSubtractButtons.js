import React, { useRef } from "react";
import { sumDict } from "../../utilities/helperFunctions.js";
import { setData } from "../../utilities/firebase";
import { Button, ButtonGroup } from "@mui/material";
import { ConfirmDialog } from "../ConfirmDialog";

const AddSubtractButtons = ({ user, item, groupId }) => {
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
                    item.quantity[user.uid] = 0;
                  }

                  // either remove one quantity from user
                  if (item.quantity[user.uid] > 1) {
                    item.quantity[user.uid] -= 1;
                  } else {
                    delete item.quantity[user.uid];
                  }
                  // check if quantity dictionay is empty, i.e. nobody wants the item
                  if (Object.keys(item.quantity).length > 0) {
                    // update quantity
                    setData(
                      `/groups/${groupId}/items/${itemName}/quantity/`,
                      item.quantity
                    );
                  } else {
                    // remove item
                    openDialog();
                  }
                }
          }
        >
          {" "}
          -{" "}
        </Button>
        <Button disabled={item.purchased} style={{ border: "0px" }}>
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
          setData(`/groups/${groupId}/items/${item.name}`, null);
          // delete item;
        }}
        props={dialogRef}
      />
    </div>
  );
};

export default AddSubtractButtons;
