import React from "react";
import Button from "@mui/material/Button";
import { ButtonGroup, Typography } from "@mui/material";
import { setData, delData } from "../utilities/firebase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from '@mui/icons-material/Image';
import ListItemText from "@mui/material/ListItemText";
 
const Popup = ({ handleClose, item, user, usersInfo }) => {
  const itemOwners = item.quantity;
  console.log(usersInfo['7DUvQqtxPkdY2FlB2NcPyv8uVA42']);

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {item ? 
          (
          <>
          <div className="item-description">
              <h1 className="item-name">{item.name}</h1>
              <span className="show-note" onClick={editNote} >Note: {item.note}</span>
              <a className="edit-note">Edit</a>
          </div>

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
            </ButtonGroup>
            <span>total_quantity: {item.total_quantity}</span>
          </div>
          
          <div className="owners show">
          <h2>Owners</h2>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                Object.entries(itemOwners).map((owner) => {
                  const uid = owner[0];
                  const individual_quantity = owner[1];
                  return (<ListItem key={uid}>
                      <ListItemAvatar>
                        <Avatar  alt={`Avatar from ${uid}`}
                        src={`${usersInfo[uid].photo_url}`}>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={usersInfo[uid].display_name} secondary={`quantity: ${individual_quantity}`} />
                  </ListItem>);
                })             
            }
          </List>
          </div></>
          ) : <h1>Delete Successfully!</h1>}
      </div>

    </div>
  );
};

const editNote = () => {
  // TODO: edit note 
}
export default Popup;