import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";
import { withRouter } from "react-router";
import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";
import { Avatar } from "@material-ui/core";
import { _calculateAge } from "../../shared/utility";

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

const Doctors = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadDoctors();
  }, []);

  const getSelectedRow = (params) => {
    console.log("Selected Row :: ", params);
    props.onSelectDoctor({ id: params.data._id, ...params.data });
  };

  const handleDelete = (id) => {
    // props.deletePet(id);
  };

  const handleEdit = () => {
    props.history.push("addDoctor");
  };

  const handleView = () => {
    props.history.push("viewDoctor");
  };

  const columns = [
    {
      width: ["Admin", "Clinic"].includes(props.type) ? 160 : 100,
      field: "",
      headerName: "Action",
      renderCell: (params) => (
        <div>
          {
            <ActionButtons
              type={props.type}
              params={params}
              roles={["Admin", "Clinic"]}
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
      renderCell: (params) => (
        params.data.profilePicture ? (<Avatar
              alt={params.data.name}
              src={params.data?.profilePicture}
              style={{ margin: "5px auto" }}
            />
          ) : (
            <Avatar alt={params.data.name} style={{ margin: "5px auto" }}>
              {params.data?.name[0]}{" "}
            </Avatar>
        )
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
    { field: "clinic", headerName: "Clinic" },
    { field: "speciality", headerName: "Speciality" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.doctors?.length) {
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        rows={props.doctors.map((elm) => {
          return { ...elm, id: elm._id, clinic: elm.clinic?.name };
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
    loadDoctors: () => dispatch(actions.fetchDoctors()),
    onSelectDoctor: (doctor) => dispatch(actions.selectDoctor(doctor)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.doctor.loading,
    error: state.doctor.error,
    doctors: state.doctor.doctors,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(withRouter(Doctors));
