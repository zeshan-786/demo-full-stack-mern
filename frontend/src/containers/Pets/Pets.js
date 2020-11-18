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
    { field: 'name', headerName: 'Name' },
    { field: 'dob', headerName: 'Date of Birth' },
    { field: 'breed', headerName: 'Breed' },
    { field: 'type', headerName: 'Type' },
    { field: 'owner', headerName: 'Owner' },
    { field: 'appointments', headerName: 'Appointments' }
  ];

const Pets = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadPets();
  }, []);

  let data = null;
  if (props.pets) {
    data = <DataTable rows={props.pets.map( elm => {
        return { ...elm, id: elm._id, appointments: elm.appointments.join(', ') }
    })} columns={columns} pageSize={props.pets.length}/>
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
    loadPets: () => dispatch(actions.fetchPets()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.pet.loading,
    error: state.pet.error,
    pets: state.pet.pets
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(Pets)
