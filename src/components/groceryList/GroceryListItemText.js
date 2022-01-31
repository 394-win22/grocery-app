import React from "react";
import { ListItemText, Typography } from "@mui/material";

const GroceryListItemText = ({ text, labelId, purchased }) => (
  <ListItemText
    disableTypography
    id={labelId}
    primary={
      <Typography
        type="body1"
        style={
          purchased
            ? {
                textDecoration: "line-through",
                color: "lightgray",
                width: "100px",
              }
            : { width: "100px" }
        } // font style
        align="left"
      >
        {text}
      </Typography>
    }
  />
);

export default GroceryListItemText;
