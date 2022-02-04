import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  signInWithGoogle,
  useUserState,
  signOut,
  setData,
} from "../utilities/firebase.js";

const SignInButton = () => (
  <Button
    color="inherit"
    className="btn btn-secondary btn-sm"
    onClick={() => signInWithGoogle()}
  >
    Sign In
  </Button>
);

const SignOutButton = () => (
  <Button
    color="inherit"
    className="btn btn-secondary btn-sm"
    onClick={() => signOut()}
  >
    Sign Out
  </Button>
);

export default function ButtonAppBar({ joinCode, userId, groupExists }) {
  const [user] = useUserState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          {/* Menu button below */}

          {/* 
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>  */}

          {/* Remove ml later */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {joinCode}
          </Typography>
          {groupExists ? (
            <Button
              color="inherit"
              onClick={() => {
                setData(`users/${userId}/group_id`, "unassigned");
              }}
            >
              Leave Group
            </Button>
          ) : (
            <></>
          )}
          {user ? <SignOutButton /> : <SignInButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
