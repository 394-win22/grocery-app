import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddNewItem from "./AddNewItem";
import {setData} from "../utilities/firebase";
import "../utilities/removeByIndex";
import removeByIndex from "../utilities/removeByIndex";

export default function GroceryList({ items }) {
  const [checked, setChecked] = React.useState([1]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item)}
                checked={checked.indexOf(item) !== -1}
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
                  <Typography type= 'body1' style={{ fontFamily: 'cursive'}} // font style
                   align='center'> {item.name} </Typography>
                  }
              />
              <Button variant="contained" 
              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} // Button size
              onClick={()=>changeQuantity(index, item.total_quantity+1, items)}> + </Button>
              <ListItemText 
                  disableTypography
                  id={labelId}
                  secondary= {
                    <Typography variant='subtitle1' align='center'>{item.total_quantity}</Typography>}
              />
              <Button variant="contained" 
              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} // Button size
              onClick={()=>changeQuantity(index, item.total_quantity-1, items)}> - </Button>
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
    setData(`/items/${index}/total_quantity`, value)
  }
}