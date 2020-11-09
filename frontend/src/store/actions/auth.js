import * as actionTypes from './actionTypes';
import axios from '../../shared/backend'


const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( idToken, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken, 
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
        let url = `auth/${method}`
        axios.post(url, authData)
                .then( res => {
                    console.log(res);
                    if ( res && res.data ) {
                        const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000)
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('expiryDate', expiryDate)
                        localStorage.setItem('userId', res.data._id)
                        localStorage.setItem('email', res.data.email)
                        dispatch(authSuccess( res.data.token, res.data._id))
                        dispatch(checkAuthTimeout(expiryDate))   
                    } else {
                        dispatch(authFail({ error: { message: "masla" } })) 
                    }
                })
                .catch( err => {
                    console.log(err);
                    // console.log(err.response.data);
                    // dispatch(authFail(err.response.data.error)) 
                    dispatch(authFail(err)) 

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