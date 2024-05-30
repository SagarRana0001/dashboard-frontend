import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Menu,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./dashboard.css";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const openMenu = Boolean(anchorEl);

  const navListAdmin = [
    {
      id: 0,
      name: "dashboard",
      link: "/dashboard",
      icon: <InboxIcon />,
    },
    {
      id: 1,
      name: "Profile",
      link: "profile",
      icon: <MailIcon />,
    },
    {
      id: 2,
      name: "CSV Files",
      link: "csv",
      icon: <MailIcon />,
    },
    {
      id: 3,
      name: "Inactive",
      link: "inactive",
      icon: <MailIcon />,
    },
    {
      id: 4,
      name: "Active",
      link: "active",
      icon: <MailIcon />,
    },
  ];
  const navListclient = [
    {
      id: 0,
      name: "dashboard",
      link: "/dashboard",
      icon: <InboxIcon />,
    },
    {
      id: 1,
      name: "Profile",
      link: "profile",
      icon: <MailIcon />,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("profile");
  };
  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.status;
  return (
    <>
      <Box className="main_cointainer">
        <Box className="cointainer">
          <Box className="row-20">
            <Box className="dashboard-col">
              <Typography variant="h3" className="text-dashboard">
                Dashboard
              </Typography>
            </Box>
            <Box className="navbar-profile-main">
              <Box className="navbar"> User Table</Box>
              <Box className="profile-icon">
                Profile
                <Button
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircle className="AccountCircle" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={anchorEl}
                  onClose={() => setAnchorEl(false)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handlelogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
          <Box className="row-80">
            <Box className="col-20">
              <Box className="sidebar">
                <List>
                  {role === "admin"
                    ? navListAdmin.map((text, index) => (
                        <ListItem
                          key={text.name}
                          disablePadding
                          sx={{ display: "block" }}
                        >
                          <ListItemButton onClick={() => navigate(text.link)}>
                            <ListItemIcon className="sidebar-icon">
                              {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    : navListclient.map((text, index) => (
                        <ListItem
                          key={text.name}
                          disablePadding
                          sx={{ display: "block" }}
                        >
                          <ListItemButton onClick={() => navigate(text.link)}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                </List>
              </Box>
            </Box>
            <Box className="col-80">
              <Box className="table">
                <Outlet />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
