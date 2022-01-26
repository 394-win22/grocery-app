import React from "react";
import Button from "@mui/material/Button";
import { ButtonGroup, Typography } from "@mui/material";
import { setData, delData } from "../utilities/firebase";
 
const Popup = ({ handleClose, item, user }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {item ? 
          (
          <><h1 className="item-name">{item.name}</h1>
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
                          if (
                            Object.keys(item.quantity).length > 0
                          ) {
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
                  {!item.quantity[user.uid]
                    ? 0
                    : item.quantity[user.uid]}
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
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={() => {
                    setData(`/items/${item.name}`, null);
                    // delete item;
                  }}
                >
                  {" "}
                  Del{" "}
                </Button>
          </ButtonGroup></>) : <h1>Delete Successfully!</h1>}
      </div>

    </div>
  );
};
 
export default Popup;