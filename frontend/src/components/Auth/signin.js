import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../store/actions';

import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../shared/backend';




const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
});

class SignIn extends Component {

    state = {
        formFields: {

            email: {
                value: ''
            },
        
            password: {
                value: ''
            },

            role: {
                value: ''
            }
        }
    }
  
  onFieldChange = ( event, fieldName ) => {
    const formField = this.state.formFields[fieldName]
    formField.value = event.target.value
    const updatedFormFields = { ...this.state.formFields, [fieldName] : formField }
    this.setState({ formFields: updatedFormFields })
 } 

  handleSubmit = ( event ) => {
    event.preventDefault()
    this.props.onAuth({ 
        email: this.state.formFields.email.value,  
        password: this.state.formFields.password.value,
        type : this.state.formFields.role.value,
    })
      
  }

    render() {
        const { classes } = this.props;
        let form = (
            <>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                    <Select
                    name="role"
                    onChange={ (event)=> this.onFieldChange(event, 'role')}
                    label="Role"
                    >
                        <MenuItem value={"Client"}>Client</MenuItem>
                        <MenuItem value={"Clinic"}>Clinic</MenuItem>
                        <MenuItem value={"Doctor"}>Doctor</MenuItem>
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
                        onChange={ (event)=> this.onFieldChange(event, 'email')}
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
                        onChange={ (event)=> this.onFieldChange(event, 'password')}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
            </>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
        errorMessage = <p>{ this.props.error.message }</p>
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
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
                { errorMessage }
                <form className={classes.form} noValidate>
                  {form}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ this.handleSubmit }
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
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( data ) => dispatch( actions.auth( data, false) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default compose(
    
  connect(
    mapStateToProps,
    mapDispatchToProps, // or put null here if you do not have actions to dispatch
  ),
  withStyles(useStyles, { withTheme: true }),
)(WithErrorHandler(SignIn, axios));

// export default withStyles(useStyles, { withTheme: true })(SignIn);