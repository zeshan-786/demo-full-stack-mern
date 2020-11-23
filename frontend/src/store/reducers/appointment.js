import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    appointments: null,
    error: null,
    loading: false
}

const fetchAppointmentsStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, appointments: null } )
}

const fetchAppointmentsSuccess = ( state, action ) => {
    return updateObject( state, { 
        appointments: action.appointments,
        error: null, 
        loading: false
    })
}

const fetchAppointmentsFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false,
    })
}


const addAppointmentStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true} )
}

const addAppointmentSuccess = ( state, action ) => {
    return updateObject( state, { 
        error: { message: "Appointment added successfully" }, 
        loading: false
    })
}


const addAppointmentFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const reducer = ( state=initialState, action ) => {
    switch (action.type) {
        
        case actionTypes.FETCH_APPOINTMENTS_START: return fetchAppointmentsStart( state, action )
        case actionTypes.FETCH_APPOINTMENTS_SUCCESS: return fetchAppointmentsSuccess( state, action )
        case actionTypes.FETCH_APPOINTMENTS_FAIL: return fetchAppointmentsFail( state, action )

        case actionTypes.ADD_APPOINTMENT_START: return addAppointmentStart( state, action )
        case actionTypes.ADD_APPOINTMENT_SUCCESS: return addAppointmentSuccess( state, action )
        case actionTypes.ADD_APPOINTMENT_FAIL: return addAppointmentFail( state, action )

        default:
          return state
    }
}

export default reducer