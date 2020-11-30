import * as actionTypes from "./actionTypes";
import { backendURL } from "../../shared/utility";

import axios from "axios";

const fetchClientsStart = () => {
  return {
    type: actionTypes.FETCH_CLIENTS_START,
  };
};

export const fetchClientsSuccess = (clients) => {
  return {
    type: actionTypes.FETCH_CLIENTS_SUCCESS,
    clients: clients,
  };
};

export const fetchClientsFail = (error) => {
  return {
    type: actionTypes.FETCH_CLIENTS_FAIL,
    error: error,
  };
};

export const fetchClients = () => {
  return (dispatch) => {
    dispatch(fetchClientsStart());
    let url = `${backendURL}/client`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchClientsSuccess(res.data));
        } else {
          dispatch(fetchClientsFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchClientsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchClientsFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchClientsFail({ message: "Something went wrong" }));
        }
      });
  };
};

//  Select Client
export const selectClient = (client) => {
  return {
    type: actionTypes.SELECT_CLIENT,
    client: client,
  };
};
