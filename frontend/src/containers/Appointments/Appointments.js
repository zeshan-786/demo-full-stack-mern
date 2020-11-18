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
    { field: 'appointmentTime', headerName: 'Appointment Time' },
    { field: 'doctor', headerName: 'Doctor',  },
    { field: 'pet', headerName: 'Patient' }
  ];

const Appointments = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadAppointments();
  }, []);

  let data = null;
  if (props.appointments) {
    data = <DataTable rows={props.appointments.map( elm => {
        return { ...elm, id: elm._id, pet: elm.pet && elm.pet.name, doctor: elm.doctor && elm.doctor.name }
    })} columns={columns} pageSize={props.appointments.length}/>
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
    loadAppointments: () => dispatch(actions.fetchAppointments()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.appointment.loading,
    error: state.appointment.error,
    appointments: state.appointment.appointments
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Appointments)
