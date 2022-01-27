import React from "react";
import { sumDict } from "../../utilities/helperFunctions.js";
import { setData } from "../../utilities/firebase";
import { Button, ButtonGroup, Typography } from "@mui/material";

const AddSubtractButtons = ({ user, item }) => {
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
                    setData(`/items/${itemName}/quantity/`, item.quantity);
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
          {sumDict(item.quantity)}
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
  );
};

export default AddSubtractButtons;
