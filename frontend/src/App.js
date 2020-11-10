import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/UI/Footer/footer";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const Home = asyncComponent(() => {
  return import("./containers/Dashboard/dashboard");
});
const Logout = asyncComponent(() => {
  return import("./components/Auth/Logout/Logout");
});
const Signin = asyncComponent(() => {
  return import("./components/Auth/signin");
});

const Signup = asyncComponent(() => {
  return import("./components/Auth/signup");
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoLogin();
  },[]);
  let routes = (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Signin} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
