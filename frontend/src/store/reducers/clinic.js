import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  clinics: null,
  error: null,
  loading: false,
  selectedClinic: null,
};

// Fetch Clinics
const fetchClinicsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, clinics: null });
};

const fetchClinicsSuccess = (state, action) => {
  return updateObject(state, {
    clinics: action.clinics,
    error: null,
    loading: false,
  });
};

const fetchClinicsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select Clinic
const selectClinic = (state, action) => {
  return updateObject(state, {
    selectedClinic: action.clinic,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Clinics
    case actionTypes.FETCH_CLINICS_START:
      return fetchClinicsStart(state, action);
    case actionTypes.FETCH_CLINICS_SUCCESS:
      return fetchClinicsSuccess(state, action);
    case actionTypes.FETCH_CLINICS_FAIL:
      return fetchClinicsFail(state, action);
    // Select Clinic
    case actionTypes.SELECT_CLINIC:
      return selectClinic(state, action);

    default:
      return state;
  }
};

export default reducer;
