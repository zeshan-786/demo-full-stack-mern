import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../store/actions";

import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState({ value: "" });
  const [password, setpassword] = useState({ value: "" });
  const [role, setRole] = useState({ value: "Client" });

  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "email":
        setEmail({ value: event.target.value });
        break;
      case "password":
        setpassword({ value: event.target.value });
        break;
      case "role":
        setRole({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAuth({
      email: email.value,
      password: password.value,
      type: role.value,
    });
  };
  let form = (
    <>
      <FormControl variant="outlined" margin="normal" required fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          name="role"
          onChange={(event) => onFieldChange(event, "role")}
          label="Role"
          value={role.value}
        >
          <MenuItem value={"Client"}>Client</MenuItem>
          <MenuItem value={"Clinic"}>Clinic</MenuItem>
          <MenuItem value={"Doctor"}>Doctor</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email.value}
        onChange={(event) => onFieldChange(event, "email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password.value}
        autoComplete="current-password"
        onChange={(event) => onFieldChange(event, "password")}
      />
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {authRedirect}
        {errorMessage}
        <form className={classes.form} noValidate>
          {form}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (data) => dispatch(actions.auth(data, false)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(SignIn);
