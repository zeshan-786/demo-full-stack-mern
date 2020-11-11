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

const reducer = ( state=initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_PETS_START: return fetchPetsStart( state, action )
        case actionTypes.FETCH_PETS_SUCCESS: return fetchPetsSuccess( state, action )
        case actionTypes.FETCH_PETS_FAIL: return fetchPetsFail( state, action )
        default:
          return state
    }
}

export default reducer