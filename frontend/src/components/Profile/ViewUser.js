import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import { _calculateAge } from "../../shared/utility";

const useStyles = makeStyles((theme) => ({
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
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ViewUser = (props) => {
  const classes = useStyles();

  const dobNage =
    props.user?.__userType !== "Clinic" ? (
      <>
        <Typography className={classes.pos} color="textSecondary">
          Born {new Date(props.user.dob).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          {_calculateAge(new Date(props.user.dob))} <strong>Old</strong>
          <br />
        </Typography>
      </>
    ) : (
      <Typography className={classes.pos} color="textSecondary">
        Joined {new Date(props.user.dob).toLocaleDateString()}
      </Typography>
    );
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {props.user?.profilePicture ? (
          <Avatar
            className={classes.large}
            alt={props.user.name}
            src={props.user?.profilePicture}
            style={{ margin: "5px auto" }}
          />
        ) : (
          <Avatar alt={props.user.name} style={{ margin: "5px auto" }}>
            {props.user?.name[0]}{" "}
          </Avatar>
        )}

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
        <Button
          size="medium"
          style={{ margin: "5px auto" }}
          onClick={props.goToEdit}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ViewUser;
