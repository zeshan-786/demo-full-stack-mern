import * as actionTypes from "./actionTypes";

import axios from "axios";

// Authentication system

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, type) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userType: type,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("type");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiryTime * 1000);
  };
};

export const auth = (authData, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    let method = isSignup ? "signup" : "signin";
    let url = `http://localhost:3000/auth/${method}`;
    axios
      .post(url, authData)
      .then((res) => {
        if (res && res.data) {
          if (!authData.isAdmin) {
            const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("expiryDate", expiryDate);
            localStorage.setItem("userId", res.data._id);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("type", res.data.type);
            dispatch(authSuccess(res.data.token, res.data._id, res.data.type));
            dispatch(checkAuthTimeout(60 * 60));
            getProfile();
          } else {
            dispatch(authFail({ message: "User added successfully" }));
          }
        } else {
          dispatch(authFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(authFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(authFail(err.request.data));
        } else {
          // anything else
          dispatch(authFail({ message: "Something went wrong" }));
        }
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiryDate = new Date(localStorage.getItem("expiryDate"));
      if (expiryDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const type = localStorage.getItem("type");
        dispatch(authSuccess(token, userId, type));
        dispatch(
          checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

// Get logged in user's profile

export const getProfileSuccess = (user) => {
  return {
    type: actionTypes.AUTH_ME_SUCCESS,
    user: user,
  };
};

export const getProfileFail = (error) => {
  return {
    type: actionTypes.AUTH_ME_FAIL,
    error: error,
  };
};

export const getProfile = () => {
  return (dispatch) => {
    let url = `http://localhost:3000/${localStorage
      .getItem("type")
      .toLowerCase()}/me`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(getProfileSuccess(res.data));
        } else {
          dispatch(getProfileFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(getProfileFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(getProfileFail(err.request.data));
        } else {
          // anything else
          dispatch(getProfileFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Set user's password

const setPasswordStart = () => {
  return {
    type: actionTypes.SET_PASSWORD_START,
  };
};

export const setPasswordSuccess = () => {
  return {
    type: actionTypes.SET_PASSWORD_SUCCESS,
  };
};

export const setPasswordFail = (error) => {
  return {
    type: actionTypes.SET_PASSWORD_FAIL,
    error: error,
  };
};

export const setPassword = (data) => {
  return (dispatch) => {
    dispatch(setPasswordStart());
    let url = `http://localhost:3000/auth/setPassword`;
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(setPasswordSuccess())
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(setPasswordFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(setPasswordFail(err.request.data));
        } else {
          // anything else
          dispatch(setPasswordFail({ message: "Something went wrong" }));
        }
      });
  };
};


// Edit user details


const editUserStart = () => {
    return {
      type: actionTypes.EDIT_USER_START,
    };
  };
  
  export const editUserSuccess = (user) => {
    return {
      type: actionTypes.EDIT_USER_SUCCESS,
      user: user
    };
  };
  
  export const editUserFail = (error) => {
    return {
      type: actionTypes.EDIT_USER_FAIL,
      error: error,
    };
  };
  
  export const editUser = (data) => {
    return (dispatch) => {
      dispatch(editUserStart());
      let url = `http://localhost:3000/${localStorage.getItem('type')}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(editUserSuccess(res.data))
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            // client received an error response (5xx, 4xx)
            dispatch(editUserFail(err.response.data));
          } else if (err.request && err.request.data) {
            // client never received a response, or request never left
            dispatch(editUserFail(err.request.data));
          } else {
            // anything else
            dispatch(editUserFail({ message: "Something went wrong" }));
          }
        });
    };
  };