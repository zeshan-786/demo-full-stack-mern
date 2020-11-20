import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Spinner from "../../components/UI/Spinner/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ContentView from "../UI/ContentView/ContentView";

// import IconButton from '@material-ui/core/IconButton';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
  center: {margin: '5px auto'}
}));

const SetPassword = (props) => {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState({ value: "" });
  const [password, setpassword] = useState({ value: "" });

  const [invalid, setInvalid ] = useState(false)
  const [showPassword, setShowPassword ] = useState(false)

  const onFieldChange = (event, fieldName) => {
    setInvalid(false)
    switch (fieldName) {
      case "newPassword":
        setNewPassword({ value: event.target.value });
        break;
      case "password":
        setpassword({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( !password.value || !newPassword.value ) {
        setInvalid(true)
    } else {
        props.onSetPassword({
            newPassword: newPassword.value,
            password: password.value,
          });
    }
  };

//   const handleClickShowPassword = () => {
//       setShowPassword(!showPassword)
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

  let form = (
    <>
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
        type={showPassword ? 'text' : 'password'}
        // endAdornment={
        //     <InputAdornment position="end">
        //     <IconButton
        //         aria-label="toggle password visibility"
        //         onClick={handleClickShowPassword}
        //         onMouseDown={handleMouseDownPassword}
        //     >
        //         {showPassword ? <Visibility /> : <VisibilityOff />}
        //     </IconButton>
        //     </InputAdornment>}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        value={newPassword.value}
        autoComplete="current-password"
        onChange={(event) => onFieldChange(event, "newPassword")}
      />
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error || invalid) {
    errorMessage = <p className={classes.error}>{props.error?.message || 'All fields are required'}</p>;
  }
  console.log('Authentication: ',props.isAuthenticated);

  return (
    <ContentView>
      <CssBaseline />
        <Avatar  className={[classes.avatar, classes.center].join(' ')}>
          <VpnKeyIcon />
        </Avatar>
        {errorMessage}
        <form className={classes.form} noValidate={false}>
          {form}
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={invalid}
          >
            Set Password
          </Button>
        </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPassword: (data) => dispatch(actions.setPassword(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(SetPassword);
