import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  fab: {
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const AddButton = (props) => {
  const classes = useStyles();

  const addButton = props.roles.includes(props.type) ? (
    <Fab
      aria-label="add"
      className={classes.fab}
      onClick={props.handleAddButton}
    >
      <AddIcon />
    </Fab>
  ) : null;
  return addButton;
};

const mapStateToProps = (state) => {
  return {
    type: state.auth.type,
  };
};

export default connect(mapStateToProps)(AddButton);
