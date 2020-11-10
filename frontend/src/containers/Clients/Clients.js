import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
}));

const Clients = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadClients();
  }, []);

  let data = null;
  if (props.clients) {
    data = <DataTable rows={props.clients.map( elm => {
        return { ...elm, id: elm._id }
    })} pageSize={props.clients.length}/>;
    // data = <DataTable />;
  }

  if (props.loading) {
    data = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={"/"} />;
  }
  return (
    <>
      {authRedirect}
      {errorMessage}
      {data}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadClients: () => dispatch(actions.fetchClients()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.client.loading,
    error: state.client.error,
    clients: state.client.clients,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Clients)
