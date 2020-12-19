import * as actionTypes from "./actionTypes";
import { backendURL } from "../../shared/utility";

import axios from "axios";

const fetchAdminsStart = () => {
  return {
    type: actionTypes.FETCH_ADMINS_START,
  };
};

export const fetchAdminsSuccess = (admins) => {
  return {
    type: actionTypes.FETCH_ADMINS_SUCCESS,
    admins: admins,
  };
};

export const fetchAdminsFail = (error) => {
  return {
    type: actionTypes.FETCH_ADMINS_FAIL,
    error: error,
  };
};

export const fetchAdmins = () => {
  return (dispatch) => {
    dispatch(fetchAdminsStart());
    let url = `${backendURL}/admin`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchAdminsSuccess(res.data));
        } else {
          dispatch(fetchAdminsFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchAdminsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchAdminsFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchAdminsFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Selete Admin
export const selectAdmin = (admin) => {
    return {
      type: actionTypes.SELECT_ADMIN,
      admin: admin,
    };
  };
  