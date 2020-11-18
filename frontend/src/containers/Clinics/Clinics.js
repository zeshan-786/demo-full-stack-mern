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
    { field: 'name', headerName: 'Full Name' },
    { field: 'email', headerName: 'Email',  },
    { field: 'dob', headerName: 'Date of Birth' },
    { field: 'doctors', headerName: 'Doctors' }
  ];

const Clinics = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadClinics();
  }, []);

  let data = null;
  if (props.clinics) {
    data = <DataTable rows={props.clinics.map( elm => {
        return { ...elm, id: elm._id, doctors: elm.doctors.join(', ')  }
    })} columns={columns} pageSize={props.clients?.length }/>
  }

  if (props.loading) {
    data = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error.message}</p>;
  }
  return (
    <>
      {errorMessage}
      {data}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadClinics: () => dispatch(actions.fetchClinics()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.clinic.loading,
    error: state.clinic.error,
    clinics: state.clinic.clinics
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Clinics)
