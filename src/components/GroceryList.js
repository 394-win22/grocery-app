import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ButtonGroup, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddNewItem from "./AddNewItem";
import { setData } from "../utilities/firebase";
import "../utilities/removeByIndex";
import removeByIndex from "../utilities/removeByIndex";
import "../App.css";

export default function GroceryList({ items }) {
  // const [checked, setChecked] = useState(
  //   items
  //     .map((item, index) => (item.purchased ? index : -1))
  //     .filter((index) => index != -1)
  // );
  const checked = items
    .map((item, index) => (item.purchased ? index : -1))
    .filter((index) => index != -1);

  const handleToggle = (index) => () => {
    if (items[index].purchased == false) {
      setData(`/items/${index}/purchased`, true);
    } else {
      setData(`/items/${index}/purchased`, false);
    }
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {items.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item.name}`;
        return (
          <ListItem
            className="item-list"
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${item.name}`}
                  src={`/static/images/avatar/${item.name}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                id={labelId}
                primary={
                  <Typography
                    type="body1"
                    style={
                      {
                        /*fontFamily: 'cursive'*/
                      }
                    } // font style
                    align="center"
                  >
                    {" "}
                    {item.name}{" "}
                  </Typography>
                }
              />
              <ButtonGroup size="small" aria-label="small button group">
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={() =>
                    changeQuantity(index, item.total_quantity - 1, items)
                  }
                >
                  {" "}
                  -{" "}
                </Button>
                <Button key="two" style={{ pointerEvents: "none" }}>
                  {item.total_quantity}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }} // Button size
                  onClick={() =>
                    changeQuantity(index, item.total_quantity + 1, items)
                  }
                >
                  {" "}
                  +{" "}
                </Button>
              </ButtonGroup>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

const changeQuantity = (index, value, items) => {
  if (value <= 0) {
    setData(`/items/`, removeByIndex(items, index));
  } else {
    setData(`/items/${index}/total_quantity`, value);
  }
};
