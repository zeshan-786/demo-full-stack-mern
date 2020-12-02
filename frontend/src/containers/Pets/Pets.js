import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import * as actions from "../../store/actions/index";

import Notification from "../../components/UI/Notification/Notification";
import { withRouter } from "react-router";
import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";
import { _calculateAge } from "../../shared/utility";

const Pets = (props) => {

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
    {
      field: "age",
      headerName: "Age",
      valueGetter: (params) => _calculateAge(new Date(params.data.dob) || undefined ),
    },
    { field: "breed", headerName: "Breed" },
    { field: "type", headerName: "Type" },
    { field: "owner", headerName: "Owner" },
    // { field: "appointments", headerName: "Appointments" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.pets?.length) {
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        columns={columns}
        rows={props.pets?.map((elm) => {
          return {
            ...elm,
            id: elm._id,
            owner: elm.owner?.name,
            // appointments: elm.appointments.join(", "),
          };
        })}
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
