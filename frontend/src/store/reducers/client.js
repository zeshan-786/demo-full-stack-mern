import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  clients: null,
  error: null,
  loading: false,
  selectedClient: null,
};

// Fetch Clients
const fetchClientsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, clients: null });
};

const fetchClientsSuccess = (state, action) => {
  return updateObject(state, {
    clients: action.clients,
    error: null,
    loading: false,
  });
};

const fetchClientsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select Client
const selectClient = (state, action) => {
  return updateObject(state, {
    selectedClient: action.client,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //   Fetch Clients
    case actionTypes.FETCH_CLIENTS_START:
      return fetchClientsStart(state, action);
    case actionTypes.FETCH_CLIENTS_SUCCESS:
      return fetchClientsSuccess(state, action);
    case actionTypes.FETCH_CLIENTS_FAIL:
      return fetchClientsFail(state, action);

    //  Select Client
    case actionTypes.SELECT_CLIENT:
      return selectClient(state, action);
    default:
      return state;
  }
};

export default reducer;
