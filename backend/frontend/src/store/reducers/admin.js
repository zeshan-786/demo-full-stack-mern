import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  admins: null,
  error: null,
  loading: false,
  selectedAdmin: null
};

const fetchAdminsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, admins: null });
};

const fetchAdminsSuccess = (state, action) => {
  return updateObject(state, {
    admins: action.admins,
    error: null,
    loading: false,
  });
};

const fetchAdminsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select Admin
const selectAdmin = (state, action) => {
  return updateObject(state, {
    selectedAdmin: action.admin,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMINS_START:
      return fetchAdminsStart(state, action);
    case actionTypes.FETCH_ADMINS_SUCCESS:
      return fetchAdminsSuccess(state, action);
    case actionTypes.FETCH_ADMINS_FAIL:
      return fetchAdminsFail(state, action);

    case actionTypes.SELECT_ADMIN:
      return selectAdmin(state, action);
    default:
      return state;
  }
};

export default reducer;
