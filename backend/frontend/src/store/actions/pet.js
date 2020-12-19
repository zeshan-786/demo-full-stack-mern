import * as actionTypes from "./actionTypes";

import axios from "axios";
import { backendURL } from "../../shared/utility";

// Fetching Pets

const fetchPetsStart = () => {
  return {
    type: actionTypes.FETCH_PETS_START,
  };
};

export const fetchPetsSuccess = (pets) => {
  return {
    type: actionTypes.FETCH_PETS_SUCCESS,
    pets: pets,
  };
};

export const fetchPetsFail = (error) => {
  return {
    type: actionTypes.FETCH_PETS_FAIL,
    error: error,
  };
};

export const fetchPets = () => {
  return (dispatch) => {
    dispatch(fetchPetsStart());
    let url = `${backendURL}/pet`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchPetsSuccess(res.data));
        } else {
          dispatch(fetchPetsFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchPetsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchPetsFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchPetsFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Adding Pet

const addPetsStart = () => {
  return {
    type: actionTypes.ADD_PET_START,
  };
};

export const addPetsSuccess = (pet) => {
  return {
    type: actionTypes.ADD_PET_SUCCESS,
    pet: pet,
  };
};

export const addPetsFail = (error) => {
  return {
    type: actionTypes.ADD_PET_FAIL,
    error: error,
  };
};

export const addPet = (pet) => {
  return (dispatch) => {
    dispatch(addPetsStart());
    let url = `${backendURL}/pet`;
    axios
      .post(url, pet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(addPetsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(addPetsFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(addPetsFail(err.request.data));
        } else {
          // anything else
          dispatch(addPetsFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Editing Pet

const editPetStart = () => {
  return {
    type: actionTypes.EDIT_PET_START,
  };
};

export const editPetSuccess = (pet) => {
  return {
    type: actionTypes.EDIT_PET_SUCCESS,
    pet: pet,
  };
};

export const editPetFail = (error) => {
  return {
    type: actionTypes.EDIT_PET_FAIL,
    error: error,
  };
};

export const editPet = (pet, id) => {
  return (dispatch) => {
    dispatch(editPetStart());
    axios
      .put(`${backendURL}/pet/${id}`, pet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(editPetSuccess(res.data));
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(editPetFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(editPetFail(err.request.data));
        } else {
          // anything else
          dispatch(editPetFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Delete Pet
export const deletePetFail = (error) => {
  return {
    type: actionTypes.DEL_PET_FAIL,
    error: error,
  };
};

export const deletePetSuccess = (id) => {
  return {
    type: actionTypes.DEL_PET_SUCCESS,
    _id: id,
  };
};

export const deletePet = (id) => {
  return (dispatch) => {
    let url = `${backendURL}/pet/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res) {
          dispatch(deletePetSuccess(id));
        }
      })
      .catch((err) => {
        console.log("Error in delete: ", err);
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(deletePetFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(deletePetFail(err.request.data));
        } else {
          // anything else
          dispatch(deletePetFail({ message: "Something went wrong" }));
        }
      });
  };
};

//  Select pet
export const selectPet = (pet) => {
  return {
    type: actionTypes.SELECT_PET,
    pet: pet,
  };
};
