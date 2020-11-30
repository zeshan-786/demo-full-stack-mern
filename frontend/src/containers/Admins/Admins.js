import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";
import { formatDateTime, formatDate } from "../../shared/utility";

import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";
import { withRouter } from "react-router";

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

const Admins = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadAdmins();
  }, []);

  const getSelectedRow = (params) => {
    console.log("Selected Row :: ", params);
    props.onSelectAdmin({ id: params.data._id, ...params.data });
  };

  const handleDelete = (id) => {
    // props.deletePet(id);
  };

  const handleEdit = () => {
    props.history.push("addUser");
  };

  const handleView = () => {
    console.info("You clicked to View.");
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
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Full Name" },
    { field: "email", headerName: "Email" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "age", headerName: "Age" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.admins) {
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        rows={props.admins.map((elm) => {
          return {
            ...elm,
            id: elm._id,
            dob: formatDate(elm.dob),
            createdAt: formatDateTime(elm.createdAt),
            updatedAt: formatDateTime(elm.updatedAt),
          };
        })}
        columns={columns}
        pageSize={props.admins.length}
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
    loadAdmins: () => dispatch(actions.fetchAdmins()),
    onSelectAdmin: (admin) => dispatch(actions.selectAdmin(admin)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.admin.loading,
    error: state.admin.error,
    admins: state.admin.admins,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(withRouter(Admins));
