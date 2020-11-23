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
    { field: 'age', headerName: 'Age' },
    { field: 'clinic', headerName: 'Clinic' },
    { field: 'speciality', headerName: 'Speciality' }
  ];

const Doctors = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadDoctors();
  }, []);

  let data = null;
  if (props.doctors) {
    data = <DataTable rows={props.doctors.map( elm => {
        return { ...elm, id: elm._id, clinic : elm.clinic?.name }
    })} columns={columns} pageSize={props.doctors.length}/>
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
    loadDoctors: () => dispatch(actions.fetchDoctors()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.doctor.loading,
    error: state.doctor.error,
    doctors: state.doctor.doctors,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Doctors)