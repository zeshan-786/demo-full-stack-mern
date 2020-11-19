import React from 'react';
import ContentView from '../UI/ContentView/ContentView';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

  return (
    <ContentView>
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Avatar alt="John Doe" style={{ margin: '5px auto' }} > J </Avatar>
        <Typography className={classes.title} component="h1" color="textSecondary" gutterBottom>
          John Doe
        </Typography>
        <Typography variant="h5" component="h2">
          john@gmail.com
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          { new Date().toLocaleDateString() }
        </Typography>
        <Typography variant="body2" component="p">
          25 years old
          <br />
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="medium" style={{ margin: '5px auto' }} >Edit</Button>
      </CardActions>
    </Card>
    </ContentView>
  );
}

export default  Profile