import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Route, Switch, withRouter } from "react-router-dom";

import {
  MainListItems,
  SecondaryListItems,
} from "../../components/ListItem/ListItem";

import AdminDashboard from "./AdminDashboard";
import AddUser from "../../components/Profile/AddUser";
import Logout from "../../components/Auth/Logout/Logout";
import AdminsView from "./AdminsView";
import ClientsView from "../Clients/ClientsView";
import ClinicsView from "../Clinics/ClinicsView";
import DoctorsView from "../Doctors/DoctorsView";
import PetsView from "../Pets/PetsView";
import AppointmentsView from "../Appointments/AppointmentsView";
import Profile from "../../components/Profile/Profile";
import AddPet from "../Pets/AddPet";
import SetPassword from "../../components/Profile/SetPassword";
import EditUser from "../../components/Profile/EditUser";
import AddAppointment from "../Appointments/AddAppointment";
import ViewAdmin from "./ViewAdmin";
import ViewClient from "../Clients/ViewClient";
import ViewClinic from "../Clinics/ViewClinic";
import ViewDoctor from "../Doctors/ViewDoctor";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Layout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {props.type} Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => props.history.push("profile")}
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => props.history.push("logout")}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{<MainListItems type={props.type} />}</List>
        <Divider />
        <List>{<SecondaryListItems type={props.type} />}</List>
      </Drawer>
      <Switch>
        <Route path="/dashboard" component={AdminDashboard} />

        <Route path="/admins" component={AdminsView} />
        <Route path="/viewAdmin" component={ViewAdmin} />

        <Route path="/clinics" component={ClinicsView} />
        <Route path="/viewClinic" component={ViewClinic} />

        <Route path="/doctors" component={DoctorsView} />
        <Route path="/addDoctor" component={AddUser} />
        <Route path="/viewDoctor" component={ViewDoctor} />


        
        <Route path="/clients" component={ClientsView} />
        <Route path="/viewClient" component={ViewClient} />

        

        <Route path="/appointments" component={AppointmentsView} />
        <Route path="/addAppointment" component={AddAppointment} />

        <Route path="/pets" component={PetsView} />
        <Route path="/addPet" component={AddPet} />

        <Route path="/addUser" component={AddUser} />

        <Route path="/profile" component={Profile} />
        <Route path="/setPassword" component={SetPassword} />
        <Route path="/editProfile" component={EditUser} />


        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={AdminDashboard} />
      </Switch>
    </div>
  );
};

export default withRouter(Layout);
