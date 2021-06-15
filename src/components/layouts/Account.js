import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";

function Account() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle style={{ fontSize: "46px" }} />
      </IconButton>
      <Menu
        style={{
          top: "54px",
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box width={156}>
          <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            <MenuItem onClick={handleClose}>
              <Typography
                style={{
                  padding: "10px",
                  textDecoration: "none",
                  color: "#000000",
                }}
                variant="h4"
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </MenuItem>
          </Link>
        </Box>
      </Menu>
    </React.Fragment>
  );
}

export default Account;
