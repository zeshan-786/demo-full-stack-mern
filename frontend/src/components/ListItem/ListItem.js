import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LayersIcon from "@material-ui/icons/Layers";
import Pets from "@material-ui/icons/Pets";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import { NavLink } from "react-router-dom";

// import { makeStyles, rgbToHex } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   link: {
//     color: 'rgba(0, 0, 0, 0.87)',
//     textDecoration: 'none'
//   },
// }));

// const classes = useStyles()
export const mainListItems = (
  <div>
    <NavLink
      style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
      to={"/dashboard"}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    {["Admin"].includes(localStorage.getItem("type")) ? (
      <ListItem button>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="Admins" />
      </ListItem>
    ) : null}
    {["Admin"].includes(localStorage.getItem("type")) ? (
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
    ) : null}
    {["Admin"].includes(localStorage.getItem("type")) ? (
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Clinics" />
      </ListItem>
    ) : null}
    {["Admin", "Client"].includes(localStorage.getItem("type")) ? (
      <ListItem button>
        <ListItemIcon>
          <Pets />
        </ListItemIcon>
        <ListItemText primary="Pets" />
      </ListItem>
    ) : null}
    {["Admin", "Clinics"].includes(localStorage.getItem("type")) ? (
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItem>
    ) : null}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>More options</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Profile" />
    </ListItem>
    {["Admin", "Clinics"].includes(localStorage.getItem("type")) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/addUser"}
      >
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
      </NavLink>
    ) : null}

    {/* <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
    <Fab color="primary" aria-label="edit">
      <EditIcon />
    </Fab> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
