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

import { Route, Switch, Redirect } from "react-router-dom";

import {
  mainListItems,
  secondaryListItems,
} from "../../components/ListItem/ListItem";

import asyncComponent from "../../hoc/asyncComponent/asyncComponent";

const AdminDashboard = asyncComponent(() => {
  return import("../Admins/AdminDashboard");
});

const ClientDashboard = asyncComponent(() => {
  return import("../Clients/ClientDashboard");
});

const AddUser = asyncComponent(() => {
  return import("../AddUser/AddUser");
});

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

  let routes = null;
  switch (localStorage.getItem("type")) {
    case "Admin":
      routes = (
        <>
          <Route path="/dashboard" exact component={AdminDashboard} />
          <Route path="/admins" component={AddUser} />
          <Route path="/clinics" component={AddUser} />
          <Route path="/doctors" component={AddUser} />
          <Route path="/clients" component={AddUser} />
          <Route path="/pets" component={AddUser} />
          <Route path="/appointments" component={AddUser} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/" exact component={AdminDashboard} />
        </>
      )
      break;
    case "Client":
      routes = (
        <>
          <Route path="/dashboard" exact component={ClientDashboard} />
          <Route path="/pets" component={AddUser} />
          <Route path="/appointments" component={AddUser} />
          <Route path="/addPet" component={AddUser} />
          <Route path="/" exact component={ClientDashboard} />
        </>
      );
      break;
    case "Clinic":
      routes = (
        <>
          <Route path="/doctors" component={AddUser} />
          <Route path="/appointments" component={AddUser} />
          <Route path="/pets" component={AddUser} />
        </>
      );
      break;
    case "Doctor":
      routes = <Route path="/appointments" component={AddUser} />;
      break;
    default:
      break;
  }

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
            {localStorage.getItem("type")} Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => console.log("Profile Button Clicked")}
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
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <Switch>
        {routes}
        <Route path="/profile" component={AddUser} />
        <Route path="/editProfile" component={AddUser} />
      </Switch>
    </div>
  );
};

export default Layout;
