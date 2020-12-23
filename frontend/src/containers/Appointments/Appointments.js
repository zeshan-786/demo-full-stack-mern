import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import DataTable from "../../components/UI/Table/Table";

import * as actions from "../../store/actions/index";
import ActionButtons from "../../components/UI/ActionButtons/ActionButtons";
import { withRouter } from "react-router";
import Notification from "../../components/UI/Notification/Notification";
import { formatDateTime } from "../../shared/utility";

const Appointments = (props) => {

  useEffect(() => {
    props.loadAppointments();
  }, []);

  const getSelectedRow = (params) => {
    console.log("Selected Row :: ", params);
    props.onSelectAppointment({ id: params.data._id, ...params.data });
  };

  const handleDelete = (id) => {
    props.onDeleteAppointment(id);
  };

  const handleEdit = () => {
    props.history.push("addAppointment");
  };

  const handleView = () => {
    console.info("You clicked to View.");
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
    { field: "id", headerName: "ID" },
    { field: "appointmentTime", headerName: "Appointment Time" },
    { field: "_doctor", headerName: "Doctor" },
    { field: "_pet", headerName: "Patient" },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
  ];

  let data = null;
  if (props.appointments?.length) {
    data = (
      <DataTable
        onRowSelected={getSelectedRow}
        columns={columns}
        rows={props.appointments?.map((elm) => {
          return {
            ...elm,
            id: elm._id,
            _pet: elm.pet && elm.pet.name,
            _doctor: elm.doctor && elm.doctor.name,
            appointmentTime: formatDateTime(elm.appointmentTime),
            createdAt: formatDateTime(elm.createdAt),
            updatedAt: formatDateTime(elm.updatedAt),
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
    loadAppointments: () => dispatch(actions.fetchAppointments()),
    onDeleteAppointment: (id) => dispatch(actions.deleteAppointment(id)),
    onSelectAppointment: (appointment) =>
      dispatch(actions.selectAppointment(appointment)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.appointment.loading,
    error: state.appointment.error,
    appointments: state.appointment.appointments,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(withRouter(Appointments));
