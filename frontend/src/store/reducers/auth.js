import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    type: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    user: null
}

// User Signup/Signin

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } )
}

const authSuccess = ( state, action ) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        type: action.userType,
        error: null, 
        loading: false
    })
}

const authFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false 
    })
}

const authLogout = ( state, action ) => {
    return updateObject( state, {
        token: null,
        userId: null,
        type: null,
        user: null
    })
}

const setAuthRedirectPath = ( state, action ) => {
    return updateObject( state, { authRedirectPath: action.path } )
}

// Get Profile

const getProfileSuccess = ( state, action ) => {
    return updateObject( state, {
        user: action.user
    })
}

const getProfileFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false 
    })
}

// Set Password

const setPasswordStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } )
}

const setPasswordSuccess = ( state, action ) => {
    return updateObject( state, {
        error: { message: 'Password updated successfully' }, 
        loading: false
    })
}

const setPasswordFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false 
    })
}

// Edit User
const editUserStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } )
}

const editUserSuccess = ( state, action ) => {
    return updateObject( state, {
        user: updateObject(state.user, action.user),
        error: { message: 'User updated successfully' }, 
        loading: false
    })
}

const editUserFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error, 
        loading: false 
    })
}

const reducer = ( state=initialState, action ) => {
    switch (action.type) {

        // User Sigin//Signup
        case actionTypes.AUTH_START: return authStart( state, action )
        case actionTypes.AUTH_SUCCESS: return authSuccess( state, action )
        case actionTypes.AUTH_FAIL: return authFail( state, action )
        case actionTypes.AUTH_LOGOUT: return authLogout( state, action )
        case actionTypes.SET_REDIRECT_PATH: return setAuthRedirectPath( state, action )

        // User Profile
        case actionTypes.AUTH_ME_SUCCESS: return getProfileSuccess( state, action )
        case actionTypes.AUTH_ME_FAIL: return getProfileFail( state, action )
        
        // Set Password
        case actionTypes.SET_PASSWORD_START: return setPasswordStart( state, action )
        case actionTypes.SET_PASSWORD_SUCCESS: return setPasswordSuccess( state, action )
        case actionTypes.SET_PASSWORD_FAIL: return setPasswordFail( state, action )

        // Edit User
        case actionTypes.EDIT_USER_START: return editUserStart( state, action )
        case actionTypes.EDIT_USER_SUCCESS: return editUserSuccess( state, action )
        case actionTypes.EDIT_USER_FAIL: return editUserFail( state, action )

        default:
          return state
    }
}

export default reducer