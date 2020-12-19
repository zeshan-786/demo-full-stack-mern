import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";

import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";
import { withRouter } from "react-router";
import { Avatar } from "@material-ui/core";
import { formatDate, formatDateTime, _calculateAge } from "../../shared/utility";

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

  const getSelectedRow = (params) => {
    console.log("Selected Row :: ", params);
    props.onSelectClient({ id: params.data._id, ...params.data });
  };

  const handleDelete = (id) => {
    // props.deletePet(id);
  };

  const handleEdit = () => {
    props.history.push("addUser");
  };

  const handleView = () => {
    props.history.push("viewClient");
  };

  const columns = [
    {
      width: ["Admin"].includes(props.type) ? 160 : 100,
      field: "",
      headerName: "Action",
      renderCell: (params) => (
        <div>
          {
            <ActionButtons
              type={props.type}
              params={params}
              roles={["Admin"]}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleView={handleView}
            />
          }
        </div>
      ),
    },
    {
      field: "profilePic",
      headerName: "Picture",
      renderCell: (params) =>
        params.data.profilePicture ? (
          <Avatar
            alt={params.data.name}
            src={params.data?.profilePicture}
            style={{ margin: "5px auto" }}
          />
        ) : (
          <Avatar alt={params.data.name} style={{ margin: "5px auto" }}>
            {params.data?.name[0]}{" "}
          </Avatar>
        ),
    },
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Full Name" },
    { field: "email", headerName: "Email" },
    { field: "dob", headerName: "Date of Birth" },
    {
      field: "age",
      headerName: "Age",
      valueGetter: (params) => _calculateAge(new Date(params.data.dob) || undefined ),
    },
    { field: "pets", headerName: "Pets" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.clients) {
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        rows={props.clients.map((elm) => {
          return {
            ...elm,
            id: elm._id,
            pets: elm.pets.flatMap((pet) => pet.name).join(", "),
            dob: formatDate(elm.dob),
            createdAt: formatDateTime(elm.createdAt),
            updatedAt: formatDateTime(elm.updatedAt),
          };
        })}
        columns={columns}
      />
    );
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
    loadClients: () => dispatch(actions.fetchClients()),
    onSelectClient: (client) => dispatch(actions.selectClient(client)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.client.loading,
    error: state.client.error,
    clients: state.client.clients,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(withRouter(Clients));
