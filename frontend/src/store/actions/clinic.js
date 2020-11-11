import * as actionTypes from './actionTypes';

import axios from 'axios'


const fetchClinicsStart = () => {
    return {
        type: actionTypes.FETCH_CLINICS_START
    }
}

export const fetchClinicsSuccess = ( clinics ) => {
    return {
        type: actionTypes.FETCH_CLINICS_SUCCESS,
        clinics: clinics,
    }
}

export const fetchClinicsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CLINICS_FAIL,
        error: error
    }
}

export const fetchClinics = () => {
    return dispatch => {
        dispatch(fetchClinicsStart())
        let url = `http://localhost:3000/clinic`
        axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then( res => {
                    if ( res && res.data ) {
                        dispatch(fetchClinicsSuccess( res.data ))
                    } else {
                        dispatch(fetchClinicsFail({ message : "Something went wrong" })) 
                    }
                })
                .catch( err => {
                    if (err.response && err.response.data) {
                        // client received an error response (5xx, 4xx)
                        dispatch(fetchClinicsFail(err.response.data))
                      } else if (err.request && err.request.data) {
                        // client never received a response, or request never left
                        dispatch(fetchClinicsFail(err.request.data))
                      } else {
                        // anything else
                        dispatch(fetchClinicsFail({ message : "Something went wrong" })) 
                      }

                })
        
    }
}