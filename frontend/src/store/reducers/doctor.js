import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    doctors: null,
    error: null,
    loading: false
}

const fetchDoctorsStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, doctors: null } )
}

const fetchDoctorsSuccess = ( state, action ) => {
    return updateObject( state, { 
        doctors: action.doctors,
        error: null, 
        loading: false
    })
}

const fetchDoctorsFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const reducer = ( state=initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTORS_START: return fetchDoctorsStart( state, action )
        case actionTypes.FETCH_DOCTORS_SUCCESS: return fetchDoctorsSuccess( state, action )
        case actionTypes.FETCH_DOCTORS_FAIL: return fetchDoctorsFail( state, action )
        default:
          return state
    }
}

export default reducer