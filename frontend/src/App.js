import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/UI/Footer/footer";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import BackButton from "./components/UI/BackButton/BackButton";

const Profile = asyncComponent(() => {
  return import("./components/Profile/Profile");
});

const Signin = asyncComponent(() => {
  return import("./components/Auth/signin");
});

const Signup = asyncComponent(() => {
  return import("./components/Auth/signup");
});

const AdminLayout = asyncComponent(() => {
  return import("./containers/Admins/AdminLayout");
});

const ClientLayout = asyncComponent(() => {
  return import("./containers/Clients/ClientLayout");
});

const ClinicLayout = asyncComponent(() => {
  return import("./containers/Clinics/ClinicLayout");
});

const DoctorLayout = asyncComponent(() => {
  return import("./containers/Doctors/DoctorLayout");
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  useEffect(() => {
    if (props.type) {
      props.getProfile();
    }
  }, [props.type]);

  let Home = <h1>No view</h1>;
  switch (props.type) {
    case "Admin":
      Home = AdminLayout;
      break;
    case "Client":
      Home = ClientLayout;
      break;
    case "Clinic":
      Home = ClinicLayout;
      break;
    case "Doctor":
      Home = DoctorLayout;
      break;

    default:
      break;
  }

  let backButton = null
  let routes = (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Signin} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = <Home type={props.type} user={props.user} />;
    backButton = <BackButton />
  }
  return (
    <div className="App">
      {routes}
      {backButton}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    type: state.auth.type,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(actions.getProfile()),
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
