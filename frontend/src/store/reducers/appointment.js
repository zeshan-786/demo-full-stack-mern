import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  appointments: null,
  error: null,
  loading: false,
  selectedAppointment: null,
};

// Fetch appointments
const fetchAppointmentsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    appointments: null,
  });
};

const fetchAppointmentsSuccess = (state, action) => {
  return updateObject(state, {
    appointments: action.appointments,
    error: null,
    loading: false,
  });
};

const fetchAppointmentsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Add Appointment
const addAppointmentStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const addAppointmentSuccess = (state, action) => {
  return updateObject(state, {
    error: { message: "Appointment added successfully" },
    loading: false,
  });
};

const addAppointmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select Appointment
const selectAppointment = (state, action) => {
  return updateObject(state, {
    selectedAppointment: action.appointment,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Appointments
    case actionTypes.FETCH_APPOINTMENTS_START:
      return fetchAppointmentsStart(state, action);
    case actionTypes.FETCH_APPOINTMENTS_SUCCESS:
      return fetchAppointmentsSuccess(state, action);
    case actionTypes.FETCH_APPOINTMENTS_FAIL:
      return fetchAppointmentsFail(state, action);
    // Add Appointment
    case actionTypes.ADD_APPOINTMENT_START:
      return addAppointmentStart(state, action);
    case actionTypes.ADD_APPOINTMENT_SUCCESS:
      return addAppointmentSuccess(state, action);
    case actionTypes.ADD_APPOINTMENT_FAIL:
      return addAppointmentFail(state, action);
    // Select Appointment
    case actionTypes.SELECT_APPOINTMENT:
      return selectAppointment(state, action);

    default:
      return state;
  }
};

export default reducer;
