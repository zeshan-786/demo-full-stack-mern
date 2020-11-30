import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  pets: null,
  error: null,
  loading: false,
  selectedPet: null,
};

const fetchPetsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, pets: null });
};

const fetchPetsSuccess = (state, action) => {
  return updateObject(state, {
    pets: action.pets,
    error: null,
    loading: false,
  });
};

const fetchPetsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const addPetStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const addPetSuccess = (state, action) => {
  return updateObject(state, {
    error: { message: "Pet added successfully" },
    loading: false,
  });
};

const addPetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const deletPetSuccess = (state, action) => {
  const filteredPets = state.pets.filter((pet) => pet._id !== action._id);
  return updateObject(state, {
    pets: filteredPets,
    error: { message: "Pet deleted successfully" },
    loading: false,
  });
};

const deletPetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select pet
const selectPet = (state, action) => {
  return updateObject(state, {
    selectedPet: action.pet,
  });
};

// Edit pet
const editPetStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const editPetSuccess = (state, action) => {
  return updateObject(state, {
    error: { message: "Pet updated successfully" },
    loading: false,
  });
};

const editPetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PETS_START:
      return fetchPetsStart(state, action);
    case actionTypes.FETCH_PETS_SUCCESS:
      return fetchPetsSuccess(state, action);
    case actionTypes.FETCH_PETS_FAIL:
      return fetchPetsFail(state, action);

    case actionTypes.ADD_PET_START:
      return addPetStart(state, action);
    case actionTypes.ADD_PET_SUCCESS:
      return addPetSuccess(state, action);
    case actionTypes.ADD_PET_FAIL:
      return addPetFail(state, action);

    case actionTypes.EDIT_PET_START:
      return editPetStart(state, action);
    case actionTypes.EDIT_PET_SUCCESS:
      return editPetSuccess(state, action);
    case actionTypes.EDIT_PET_FAIL:
      return editPetFail(state, action);

    case actionTypes.DEL_PET_SUCCESS:
      return deletPetSuccess(state, action);
    case actionTypes.DEL_PET_FAIL:
      return deletPetFail(state, action);

    case actionTypes.SELECT_PET:
      return selectPet(state, action);

    default:
      return state;
  }
};

export default reducer;
