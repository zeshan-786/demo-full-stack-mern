import React from "react";
import ContentView from "../UI/ContentView/ContentView";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Profile = (props) => {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;

  const goToEdit = () => {
      props.history.push('editProfile')
  }

  let dobNage =
    props.user?.__userType !== "Clinic" ? (
      <>
        <Typography className={classes.pos} color="textSecondary">
          Born {new Date(props.user.dob).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          {props.user.age} years old
          <br />
        </Typography>
      </>
    ) : (
      <Typography className={classes.pos} color="textSecondary">
        Joined {new Date(props.user.dob).toLocaleDateString()}
      </Typography>
    );
  return (
    <ContentView>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar alt="John Doe" style={{ margin: "5px auto" }}>
            {" "}
            {props.user?.name[0]}{" "}
          </Avatar>
          <Typography
            className={classes.title}
            component="h1"
            color="textSecondary"
            gutterBottom
          >
            {props.user.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.user.email}
          </Typography>
          {dobNage}
        </CardContent>
        <CardActions>
          <Button size="medium" style={{ margin: "5px auto" }} onClick={goToEdit} >
            Edit
          </Button>
        </CardActions>
      </Card>
    </ContentView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
