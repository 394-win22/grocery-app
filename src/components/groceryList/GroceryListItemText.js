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
                minWidth: "100px",
              }
            : { minWidth: "100px" }
        } // font style
        align="center"
      >
        {text.length > 10 ? text.substring(0, 7) + "..." : text}
      </Typography>
    }
  />
);

export default GroceryListItemText;