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
import ScheduleIcon from "@material-ui/icons/Schedule";

import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import { NavLink } from "react-router-dom";

export const MainListItems = (props) => (
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
    <NavLink
      style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
      to={"/appointments"}
    >
      <ListItem button>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItem>
    </NavLink>
    {["Admin"].includes(props.type) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/admins"}
      >
        <ListItem button>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
      </NavLink>
    ) : null}
    {["Admin", "Clinic"].includes(props.type) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/clients"}
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
      </NavLink>
    ) : null}
    {["Admin"].includes(props.type) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/clinics"}
      >
        <ListItem button>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Clinics" />
        </ListItem>
      </NavLink>
    ) : null}
    
    {["Admin", "Client", "Clinic"].includes(props.type) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/pets"}
      >
        <ListItem button>
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <ListItemText primary="Pets" />
        </ListItem>
      </NavLink>
    ) : null}
    {["Admin", "Clinic"].includes(props.type) ? (
      <NavLink
        style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
        to={"/doctors"}
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
        </ListItem>
      </NavLink>
    ) : null}
  </div>
);

export const SecondaryListItems = (props) => (
  <div>
    <ListSubheader inset>More options</ListSubheader>
    <NavLink
      style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
      to={"/profile"}
    >
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </NavLink>
    <NavLink
      style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
      to={"/setPassword"}
    >
    <ListItem button>
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Set Password" />
    </ListItem>
    </NavLink>
    <NavLink
      style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
      to={"/editProfile"}
    >
    <ListItem button>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Profile" />
    </ListItem>
    </NavLink>
  </div>
);
