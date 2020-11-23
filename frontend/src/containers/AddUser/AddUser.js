import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/PersonAdd";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Spinner from "../../components/UI/Spinner/Spinner";

import ContentView from "../../components/UI/ContentView/ContentView";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  center: { margin: "5px auto" },
}));

const AddUser = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState({ value: "" });
  const [password, setpassword] = useState({ value: "" });
  const [role, setRole] = useState({ value: "Doctor" });
  const [name, setName] = useState({ value: "" });
  const [dob, setDob] = useState({ value: "2000-01-01" });
  const [clinic, setClinic] = useState({ value: props.userId });
  const [website, setWebsite] = useState({ value: "" });
  const [speciality, setSpeciality] = useState({ value: "" });

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
      case "name":
        setName({ value: event.target.value });
        break;
      case "dob":
        setDob({ value: event.target.value });
        break;
      case "clinic":
        setClinic({ value: event.target.value });
        break;
      case "website":
        setWebsite({ value: event.target.value });
        break;
      case "speciality":
        setSpeciality({ value: event.target.value });
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
      name: name.value,
      dob: dob.value,
      type: role.value,
      clinic: clinic.value ? clinic.value : undefined,
      website: website.value ? website.value : undefined,
      speciality: speciality.value ? speciality.value : undefined,
      isAdmin: true,
    });
  };

  let userRole =
    props.type === "Admin" ? (
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
    ) : null;

  let clinicWebsite =
    role.value === "Clinic" ? (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="website"
        label="Clinic Website"
        type="text"
        id="website"
        autoComplete="website"
        value={website.value}
        onChange={(event) => onFieldChange(event, "website")}
      />
    ) : null;

  let doctorClinic =
    role.value === "Doctor" ? (
      <>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="speciality"
          label="Doctor's Speciality"
          type="text"
          id="speciality"
          autoComplete="speciality"
          value={speciality.value}
          onChange={(event) => onFieldChange(event, "speciality")}
        />
        {props.type === "Admin" ? (
          <FormControl variant="outlined" margin="normal" required fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Clinic
            </InputLabel>
            <Select
              name="clinic"
              onChange={(event) => onFieldChange(event, "clinic")}
              label="Clinic"
              value={clinic.value}
            >
              {props.clinics.map((clinic) => {
                return (
                  <MenuItem key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}
      </>
    ) : null;

  let form = (
    <>
      {userRole}
      {doctorClinic}
      {clinicWebsite}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="Full Name"
        type="text"
        id="name"
        autoComplete="name"
        value={name.value}
        onChange={(event) => onFieldChange(event, "name")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="email"
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
        autoComplete="current-password"
        value={password.value}
        onChange={(event) => onFieldChange(event, "password")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Date of Birth"
        type="date"
        name="dob"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={dob.value}
        onChange={(event) => onFieldChange(event, "dob")}
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
  return (
    <ContentView>
      <CssBaseline />
      <Avatar className={[classes.avatar, classes.center].join(" ")}>
        <LockOutlinedIcon />
      </Avatar>
      {errorMessage}
      <form className={classes.form} noValidate>
        {form}
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Add User
        </Button>
      </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (data) => dispatch(actions.auth(data, true)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    type: state.auth.type,
    clinics: state.clinic.clinics,
    userId: state.auth.userId,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(AddUser);
