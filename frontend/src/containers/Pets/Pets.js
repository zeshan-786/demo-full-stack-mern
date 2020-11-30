import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import { makeStyles } from "@material-ui/core/styles";
import ViewIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import * as actions from "../../store/actions/index";

import Notification from "../../components/UI/Notification/Notification";
import { withRouter } from "react-router";
import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";

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
    margin: theme.spacing(1),
  },
}));

const Pets = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.loadPets();
  }, []);

  useEffect(() => {}, [props.pets]);

  const getSelectedRow = (params) => {
    console.log("Selected Row :: ", params);
    props.onSelectPet({ id: params.data._id, ...params.data });
  };

  const handleDelete = (id) => {
    props.deletePet(id);
  };

  const handleEdit = () => {
    props.history.push("addPet");
  };

  const handleView = () => {
    console.info("You clicked to View.");
  };

  const actionButtons = ["Admin", "Client"].includes(props.type)
    ? (params) => (
        <>
          <IconButton color="inherit" onClick={() => handleView()}>
            <ViewIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => handleEdit()}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => handleDelete(params.data.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    : (params) => (
        <IconButton color="inherit" onClick={() => handleView()}>
          <ViewIcon />
        </IconButton>
      );

  const columns = [
    {
      width: ["Admin", "Client"].includes(props.type) ? 160 : 100,
      field: "",
      headerName: "Action",
      renderCell: (params) => (
        <div>
          <ActionButtons
            type={props.type}
            params={params}
            roles={["Admin", "Client"]}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
          />
        </div>
      ),
    },
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "breed", headerName: "Breed" },
    { field: "type", headerName: "Type" },
    { field: "owner", headerName: "Owner" },
    { field: "appointments", headerName: "Appointments" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.pets?.length) {
    console.log("Total Pets", props.pets?.length);
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        columns={columns}
        rows={props.pets?.map((elm) => {
          return {
            ...elm,
            id: elm._id,
            owner: elm.owner?.name,
            appointments: elm.appointments.join(", "),
          };
        })}
        rowsPerPageOptions={[10, 25, 50]}
      />
    );
  }

  if (props.loading) {
    data = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    const message = props.error?.message;
    const severity = message.toLowerCase().includes("successfully")
      ? "success"
      : "error";
    errorMessage = <Notification severity={severity} message={message} />;
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
    deletePet: (id) => dispatch(actions.deletePet(id)),
    onSelectPet: (pet) => dispatch(actions.selectPet(pet)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.pet.loading,
    error: state.pet.error,
    pets: state.pet.pets,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(withRouter(Pets));
