import * as actionTypes from './actionTypes';

import axios from 'axios'


const fetchPetsStart = () => {
    return {
        type: actionTypes.FETCH_PETS_START
    }
}

export const fetchPetsSuccess = ( pets ) => {
    return {
        type: actionTypes.FETCH_PETS_SUCCESS,
        pets: pets,
    }
}

export const fetchPetsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PETS_FAIL,
        error: error
    }
}

export const fetchPets = () => {
    return dispatch => {
        dispatch(fetchPetsStart())
        let url = `http://localhost:3000/pet`
        axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then( res => {
                    if ( res && res.data ) {
                        dispatch(fetchPetsSuccess( res.data ))
                    } else {
                        dispatch(fetchPetsFail({ message : "Something went wrong" })) 
                    }
                })
                .catch( err => {
                    if (err.response && err.response.data) {
                        // client received an error response (5xx, 4xx)
                        dispatch(fetchPetsFail(err.response.data))
                      } else if (err.request && err.request.data) {
                        // client never received a response, or request never left
                        dispatch(fetchPetsFail(err.request.data))
                      } else {
                        // anything else
                        dispatch(fetchPetsFail({ message : "Something went wrong" })) 
                      }

                })
        
    }
}