import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const QuantityByPerson = ({ quantityDict, usersInfo }) => {
  return (
    <List>
      {Object.entries(quantityDict).map((owner) => {
        const uid = owner[0];
        const individual_quantity = owner[1];
        return (
          <ListItem key={uid}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar from ${uid}`}
                src={`${usersInfo[uid].photo_url}`}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={usersInfo[uid].display_name}
              secondary={`Wants ${individual_quantity}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default QuantityByPerson;
