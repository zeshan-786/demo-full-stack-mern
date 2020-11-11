import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import  ReduxThunk from 'redux-thunk'

import authReducer from './store/reducers/auth'
import clientReducer from './store/reducers/client'
import petReducer from './store/reducers/pet'
import doctorReducer from './store/reducers/doctor'
import clinicReducer from './store/reducers/clinic'

import adminReducer from './store/reducers/admin'
import appointmentReducer from './store/reducers/appointment'

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  doctor: doctorReducer,
  clinic: clinicReducer,
  pet: petReducer,
  appointment: appointmentReducer,
  admin: adminReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const composeEnhancers = compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter basename={'/'}>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
