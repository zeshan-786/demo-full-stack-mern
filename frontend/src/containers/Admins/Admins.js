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

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Full Name' },
    { field: 'email', headerName: 'Email',  },
    { field: 'dob', headerName: 'Date of Birth' },
    { field: 'age', headerName: 'Age' },
    { field: 'createdAt', headerName: 'Created' },
    { field: 'updatedAt', headerName: 'Updated' },
  ];

const Admins = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadAdmins();
  }, []);

  let data = null;
  if (props.admins) {
    data = <DataTable rows={props.admins.map( elm => {
        return { ...elm, id: elm._id }
    })} columns={columns} pageSize={props.admins.length}/>
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
    loadAdmins: () => dispatch(actions.fetchAdmins()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.admin.loading,
    error: state.admin.error,
    admins: state.admin.admins,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Admins)
