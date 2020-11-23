import * as actionTypes from './actionTypes';

import axios from 'axios'


const fetchAppointmentsStart = () => {
    return {
        type: actionTypes.FETCH_APPOINTMENTS_START
    }
}

export const fetchAppointmentsSuccess = ( appointments ) => {
    return {
        type: actionTypes.FETCH_APPOINTMENTS_SUCCESS,
        appointments: appointments,
    }
}

export const fetchAppointmentsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_APPOINTMENTS_FAIL,
        error: error
    }
}

export const fetchAppointments = () => {
    return dispatch => {
        dispatch(fetchAppointmentsStart())
        let url = `http://localhost:3000/appointment`
        axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then( res => {
                    if ( res && res.data ) {
                        dispatch(fetchAppointmentsSuccess( res.data ))
                    } else {
                        dispatch(fetchAppointmentsFail({ message : "Something went wrong" })) 
                    }
                })
                .catch( err => {
                    if (err.response && err.response.data) {
                        // client received an error response (5xx, 4xx)
                        dispatch(fetchAppointmentsFail(err.response.data))
                      } else if (err.request && err.request.data) {
                        // client never received a response, or request never left
                        dispatch(fetchAppointmentsFail(err.request.data))
                      } else {
                        // anything else
                        dispatch(fetchAppointmentsFail({ message : "Something went wrong" })) 
                      }

                })
        
    }
}


// Adding Appointment

const addAppointmentStart = () => {
    return {
      type: actionTypes.ADD_APPOINTMENT_START,
    };
  };
  
  export const addAppointmentSuccess = (appointment) => {
    return {
      type: actionTypes.ADD_APPOINTMENT_SUCCESS,
      appointment: appointment,
    };
  };
  
  export const addAppointmentFail = (error) => {
    return {
      type: actionTypes.ADD_APPOINTMENT_FAIL,
      error: error,
    };
  };
  
  export const addAppointment = (appointment) => {
    return (dispatch) => {
      dispatch(addAppointmentStart());
      let url = `http://localhost:3000/appointment`;
      axios
        .post(url, appointment, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
            dispatch(addAppointmentSuccess(res.data));
        })
        .catch((err) => {
            console.log(err);
          if (err.response && err.response.data) {
            // client received an error response (5xx, 4xx)
            dispatch(addAppointmentFail(err.response.data));
          } else if (err.request && err.request.data) {
            // client never received a response, or request never left
            dispatch(addAppointmentFail(err.request.data));
          } else {
            // anything else
            dispatch(addAppointmentFail({ message: "Something went wrong" }));
          }
        });
    };
  };