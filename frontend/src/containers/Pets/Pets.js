import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Chip from '@material-ui/core/Chip';

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
  button: {
    margin: theme.spacing(1)
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
  const [ selectedRow ,setSelectedRow ] = useState(null)
  const classes = useStyles();

  const { pets } = props

  useEffect(() => {
    props.loadPets();
  }, []);

  useEffect(() => {
    console.log(pets);
  }, [props.pets]);


  
  const getSelectedRow = ( params ) => {
    console.log('Selected Row :: ',params);
    setSelectedRow({ id : params.data._id, ...params })
  }

  const handleDelete = ( id ) => {
    console.info('You clicked to Delete.', id);
    props.deletePet( id )
  };

  const handleEdit = ( pet ) => {
    console.info('You clicked to Edit.', pet);
  };

  let data = null;
  if (pets?.length) {
    data = <DataTable onRowSelected={getSelectedRow} columns={columns} rows={pets.map( elm => {
        return { ...elm, id: elm._id, appointments: elm.appointments.join(', ') }
    })} rowsPerPageOptions={[ 10, 25, 50 ]}/>
  }

  if (props.loading) {
    data = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error?.message}</p>;
  }
  return (
    <>
      { selectedRow?.id ? (<div className={classes.buttons}>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=> handleDelete(selectedRow.id)}
      >
        Delete
      </Button>
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<EditIcon />}
      onClick={()=>handleEdit(selectedRow)}
    >
      Edit
    </Button>
    <Chip
        label={ `Edit | ${selectedRow.id}`}
        onClick={()=>handleEdit(selectedRow)}
        onDelete={()=>handleDelete(selectedRow.id)}
        variant="outlined"
        deleteIcon={<DeleteIcon/>}
      />
      </div>) : null }
      {errorMessage}
      {data}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPets: () => dispatch(actions.fetchPets()),
    deletePet: ( id ) => dispatch(actions.deletePet( id ))
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
