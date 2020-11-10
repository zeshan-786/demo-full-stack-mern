import * as actionTypes from './actionTypes';

import axios from 'axios'


const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token, 
        userId: userId
    }
}

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('type')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = ( expiryTime ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() )
        }, expiryTime * 1000 )
    }
}


export const auth = ( authData, isSignup ) => {
    return dispatch => {
        dispatch(authStart())
        let method =  isSignup ? 'signup' : 'signin'
        let url = `http://localhost:3000/auth/${method}`
        axios.post(url, authData)
                .then( res => {
                    if ( res && res.data ) {
                        const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000)
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('expiryDate', expiryDate)
                        localStorage.setItem('userId', res.data._id)
                        localStorage.setItem('email', res.data.email)
                        localStorage.setItem('type', res.data.type)
                        dispatch(authSuccess( res.data.token, res.data._id))
                        dispatch(checkAuthTimeout( 60 * 60 ))   
                    } else {
                        dispatch(authFail({ message : "Something went wrong" })) 
                    }
                })
                .catch( err => {
                    if (err.response && err.response.data) {
                        // client received an error response (5xx, 4xx)
                        dispatch(authFail(err.response.data))
                      } else if (err.request && err.request.data) {
                        // client never received a response, or request never left
                        dispatch(authFail(err.request.data))
                      } else {
                        // anything else
                        dispatch(authFail({ message : "Something went wrong" })) 
                      }

                })
        
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'))
            if (expiryDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId  = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout( (expiryDate.getTime() - new Date().getTime())/1000 ) )
            }
        }
    }
}