import React, { useState } from "react";
import { IconButton } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { setData } from "../utilities/firebase";

export default function CheckoutButton({ items, groupId }) {
  const handleClick = () => {
    var filtered_items = Object.keys(items).filter(
      (key) => items[key].purchased === true
    );

    for (let i = 0; i < filtered_items.length; i++) {
      setData(`groups/${groupId}/items/${filtered_items[i]}`, null);
    }
  };
  return (
    <IconButton
      variant="contained"
      style={{
        display: "flex",
        justifySelf: "left",

        height: "50px",
        width: "50px",
        backgroundColor: "#1976d2",
        fontSize: 11,
        marginBottom: "20px",
      }}
      onClick={() => {
        handleClick();
      }}
    >
    <RemoveIcon style={{ color: "white" }} />
    </IconButton>
  );
}
