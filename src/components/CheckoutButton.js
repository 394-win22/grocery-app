import React, { useState } from "react";
import {Button} from "@mui/material";
import { setData } from "../utilities/firebase";

export default function CheckoutButton({items}) {
    const handleClick = () => {
      console.log("here")
      var filtered_items = Object.keys(items).filter(key => items[key].purchased === true)
      
      for (let i = 0; i < filtered_items.length; i++) {
        setData(`/items/${filtered_items[i]}`, null);
      }
    }
  return (
      <Button variant="contained"
      style={{
        display: "flex",
        justifySelf: "left",
        
        height: "50px",
        width: "50px",
        backgroundColor: "#1976d2",
        marginRight: "20px",
        marginBottom: "20px",
        fontSize: 11,
      }}
      onClick={() => {
        handleClick();
      }}
      >CheckOut</Button>
  );
}