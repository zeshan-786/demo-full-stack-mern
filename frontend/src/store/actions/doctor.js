import * as actionTypes from "./actionTypes";
import { backendURL } from "../../shared/utility";

import axios from "axios";

const fetchDoctorsStart = () => {
  return {
    type: actionTypes.FETCH_DOCTORS_START,
  };
};

export const fetchDoctorsSuccess = (doctors) => {
  return {
    type: actionTypes.FETCH_DOCTORS_SUCCESS,
    doctors: doctors,
  };
};

export const fetchDoctorsFail = (error) => {
  return {
    type: actionTypes.FETCH_DOCTORS_FAIL,
    error: error,
  };
};

export const fetchDoctors = () => {
  return (dispatch) => {
    dispatch(fetchDoctorsStart());
    let url = `${backendURL}/doctor`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchDoctorsSuccess(res.data));
        } else {
          dispatch(fetchDoctorsFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchDoctorsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchDoctorsFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchDoctorsFail({ message: "Something went wrong" }));
        }
      });
  };
};


//  Select Doctor
export const selectDoctor = (doctor) => {
    return {
      type: actionTypes.SELECT_DOCTOR,
      doctor: doctor,
    };
  };