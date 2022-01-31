import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function SimpleBottomNavigation({value, setValue}) {

  return (
    <Box sx={{ position: 'fixed', bottom: 0, top: "auto", width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* Plan button */}
        <BottomNavigationAction label="Plan" icon={<PlaylistAddIcon />} />
        {/* Shop button */}
        <BottomNavigationAction label="Shop" icon={<ShoppingCartCheckoutIcon />} />
      </BottomNavigation>
    </Box>
  );
}