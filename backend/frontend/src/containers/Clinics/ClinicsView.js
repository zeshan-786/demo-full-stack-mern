import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import ContentView from "../../components/UI/ContentView/ContentView";
import Clinics from "./Clinics";
import AddButton from "../../components/UI/AddButton/AddButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: window.innerHeight,
  },
}));

const ClinicsView = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleAddButton = () => {
    props.onSelectPet();
    props.history.push("addUser");
  };

  return (
    <ContentView>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <h1>Clinics</h1>
          { <AddButton roles={["Admin"]} handleAddButton={handleAddButton} />   }
          <Clinics />
        </Paper>
      </Grid>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPet: () => dispatch(actions.selectPet(null)),
  };
};


export default connect(
  null,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(ClinicsView)
