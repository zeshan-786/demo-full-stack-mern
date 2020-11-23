import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Clients from "../Clients/Clients";
import Doctors from "../Doctors/Doctors";
import Pets from "../Pets/Pets";
import Appointments from "../Appointments/Appointments";
import ContentView from "../../components/UI/ContentView/ContentView";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ContentView>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <h1>Clients</h1>
          <Clients />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <h1>Pets</h1>
          <Pets />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <h1>Doctors</h1>
          <Doctors />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <h1>Appointments</h1>
          <Appointments />
        </Paper>
      </Grid>
    </ContentView>
  );
};

export default Dashboard;
