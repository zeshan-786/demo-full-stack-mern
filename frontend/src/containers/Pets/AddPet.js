import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import PetIcon from "@material-ui/icons/PetsOutlined";

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

const AddPet = (props) => {
  const classes = useStyles();
  const [type, setType] = useState({ value: "" });
  const [breed, setBreed] = useState({ value: "" });
  const [owner, setOwner] = useState({ value: "" });
  const [name, setName] = useState({ value: "" });
  const [dob, setDob] = useState({ value: "2000-05-24" });

  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "name":
        setName({ value: event.target.value });
        break;
      case "type":
        setType({ value: event.target.value });
        break;
      case "breed":
        setBreed({ value: event.target.value });
        break;
      case "owner":
        setOwner({ value: event.target.value });
        break;
      case "dob":
        setDob({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddPet({
      breed: breed.value,
      name: name.value,
      dob: dob.value,
      type: type.value,
      owner: owner.value ? owner.value : undefined
    });
    // props.history.push("pets");
  };

  let owners = null;
  if (props.type === "Admin") {
    owners = (
      <FormControl variant="outlined" margin="normal" required fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Owner</InputLabel>
        <Select
          name="owner"
          onChange={(event) => onFieldChange(event, "owner")}
          label="Owner"
          value={owner.value}
        >
          {props.owners.map((owner) => {
            return <MenuItem key={owner._id} value={owner._id}>{owner.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }

  let form = (
    <>
      <FormControl variant="outlined" margin="normal" required fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          name="type"
          onChange={(event) => onFieldChange(event, "type")}
          label="Type"
          value={type.value}
          required
        >
          <MenuItem value={"Cat"}>Cat</MenuItem>
          <MenuItem value={"Dog"}>Dog</MenuItem>
          <MenuItem value={"Horse"}>Horse</MenuItem>
          <MenuItem value={"Bird"}>Bird</MenuItem>
        </Select>
      </FormControl>
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
        name="breed"
        label="Breed"
        type="text"
        id="breed"
        value={breed.value}
        onChange={(event) => onFieldChange(event, "breed")}
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
      {owners}
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
        <PetIcon />
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
          Save Pet
        </Button>
      </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPet: (pet) => dispatch(actions.addPet(pet)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.pet.loading,
    error: state.pet.error,
    type: state.auth.type,
    owners: state.client.clients,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(AddPet);
