import React, { useState } from "react";
import { Button} from "@mui/material";

export default function CheckoutButton({items}) {
    const handleClick = () => {
      console.log(items.length)
      var filtered_items = Object.keys(items).filter(key => items[key].purchased === false)
      console.log(filtered_items.length)
      for (let i = 0; filtered_items.length; i++) {
        delete items[filtered_items[i]]
      }
      console.log(items.length)
    }
  return (
      <Button variant="contained"
      onClick={handleClick()}
      >CheckOut</Button>
  );
}