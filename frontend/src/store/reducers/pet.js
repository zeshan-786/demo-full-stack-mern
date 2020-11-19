import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    pets: null,
    error: null,
    loading: false
}

const fetchPetsStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, pets: null } )
}

const fetchPetsSuccess = ( state, action ) => {
    return updateObject( state, { 
        pets: action.pets,
        error: null, 
        loading: false
    })
}

const fetchPetsFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const addPetStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, pet: null } )
}

const addPetSuccess = ( state, action ) => {
    return updateObject( state, { 
        pets: [ ...state.pets, action.pet  ],
        error: { message: "Pet added successfully" }, 
        loading: false
    })
}


const addPetFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const deletPetSuccess = ( state, action ) => {
    const filteredPets = state.pets.filter( pet => pet._id !== action._id )
    return updateObject( state, { 
        pets: filteredPets,
        error: { message: "Pet deleted successfully" }, 
        loading: false
    })
}

const deletPetFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const reducer = ( state=initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_PETS_START: return fetchPetsStart( state, action )
        case actionTypes.FETCH_PETS_SUCCESS: return fetchPetsSuccess( state, action )
        case actionTypes.FETCH_PETS_FAIL: return fetchPetsFail( state, action )

        case actionTypes.ADD_PET_START: return addPetStart( state, action )
        case actionTypes.ADD_PET_SUCCESS: return addPetSuccess( state, action )
        case actionTypes.ADD_PET_FAIL: return addPetFail( state, action )

        case actionTypes.DEL_PET_SUCCESS: return deletPetSuccess( state, action )
        case actionTypes.DEL_PET_FAIL: return deletPetFail( state, action )

        default:
          return state
    }
}

export default reducer