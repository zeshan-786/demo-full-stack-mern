import * as actionTypes from "./actionTypes";
import { backendURL } from "../../shared/utility";

import axios from "axios";

const fetchAppointmentsStart = () => {
  return {
    type: actionTypes.FETCH_APPOINTMENTS_START,
  };
};

export const fetchAppointmentsSuccess = (appointments) => {
  return {
    type: actionTypes.FETCH_APPOINTMENTS_SUCCESS,
    appointments: appointments,
  };
};

export const fetchAppointmentsFail = (error) => {
  return {
    type: actionTypes.FETCH_APPOINTMENTS_FAIL,
    error: error,
  };
};

export const fetchAppointments = () => {
  return (dispatch) => {
    dispatch(fetchAppointmentsStart());
    let url = `${backendURL}/appointment`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchAppointmentsSuccess(res.data));
        } else {
          dispatch(fetchAppointmentsFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchAppointmentsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchAppointmentsFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchAppointmentsFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Adding Appointment

const addAppointmentStart = () => {
  return {
    type: actionTypes.ADD_APPOINTMENT_START,
  };
};

export const addAppointmentSuccess = (appointment) => {
  return {
    type: actionTypes.ADD_APPOINTMENT_SUCCESS,
    appointment: appointment,
  };
};

export const addAppointmentFail = (error) => {
  return {
    type: actionTypes.ADD_APPOINTMENT_FAIL,
    error: error,
  };
};

export const addAppointment = (appointment) => {
  return (dispatch) => {
    dispatch(addAppointmentStart());
    let url = `${backendURL}/appointment`;
    axios
      .post(url, appointment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(addAppointmentSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(addAppointmentFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(addAppointmentFail(err.request.data));
        } else {
          // anything else
          dispatch(addAppointmentFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Editing Appointment

const editAppointmentStart = () => {
  return {
    type: actionTypes.EDIT_APPOINTMENT_START,
  };
};

export const editAppointmentSuccess = (appointment) => {
  return {
    type: actionTypes.EDIT_APPOINTMENT_SUCCESS,
    appointment: appointment,
  };
};

export const editAppointmentFail = (error) => {
  return {
    type: actionTypes.EDIT_APPOINTMENT_FAIL,
    error: error,
  };
};

export const editAppointment = (appointment, id) => {
  console.log(appointment);
  return (dispatch) => {
    dispatch(editAppointmentStart());
    axios
      .put(`${backendURL}/appointment/${id}`, appointment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(editAppointmentSuccess(res.data));
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(editAppointmentFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(editAppointmentFail(err.request.data));
        } else {
          // anything else
          dispatch(editAppointmentFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Delete Appointment
export const deleteAppointmentFail = (error) => {
  return {
    type: actionTypes.DEL_APPOINTMENT_FAIL,
    error: error,
  };
};

export const deleteAppointmentSuccess = (id) => {
  return {
    type: actionTypes.DEL_APPOINTMENT_SUCCESS,
    _id: id,
  };
};

export const deleteAppointment = (id) => {
  return (dispatch) => {
    let url = `${backendURL}/appointment/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res) {
          dispatch(deleteAppointmentSuccess(id));
        }
      })
      .catch((err) => {
        console.log("Error in delete: ", err);
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(deleteAppointmentFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(deleteAppointmentFail(err.request.data));
        } else {
          // anything else
          dispatch(deleteAppointmentFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Selete Appointment
export const selectAppointment = (appointment) => {
  return {
    type: actionTypes.SELECT_APPOINTMENT,
    appointment: appointment,
  };
};
