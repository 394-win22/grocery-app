import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

export default function SimpleBottomNavigation({ value, setValue }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        top: "auto",
        width: "90%",
        height: "60px",
        background:"white"
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ height: "60px"}}
      >
        {/* Plan button */}
        <BottomNavigationAction label="Planner" icon={<AddShoppingCartIcon />} />
        {/* Shop button */}
        <BottomNavigationAction
          label="Checklist"
          icon={<LibraryAddCheckIcon />}
        />
        {/* Summary button */}
        <BottomNavigationAction
          label="Purchased"
          icon={<PriceCheckIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
