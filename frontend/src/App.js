import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/UI/Footer/footer";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import asyncComponent from "./hoc/asyncComponent/asyncComponent"

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

const App = (props) => {
  useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  let Home = <h1>No view</h1>;
  switch (props.type) {
    case "Admin":
      Home = AdminLayout;
      break;
    case "Client":
      Home = ClientLayout;
      break;
    case "Clinic":
      Home = <h1>Clinic</h1>;
      break;
    case "Doctor":
      Home = <h1>Doctor G</h1>;
      break;

    default:
      break;
  }

  let routes = (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Signin} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = <Home type={props.type} />;
  }
  return (
    <div className="App">
      {routes}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    type: state.auth.type
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
