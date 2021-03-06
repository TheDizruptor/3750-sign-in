import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { myFirebase } from "../firebase/firebase";
import firebase from "firebase/app";
import { withStyles } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AlternateEmail from "@material-ui/icons/AlternateEmail";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

// styles for sign in page
const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#efefef"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 40,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50060"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50060",
    marginBottom: 5,
    textAlign: "center"
  },
  Button: {
      marginTop: 10
  }
});

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { classes, isLoggingOut, logoutError} = this.props;
    // var loading = true;
    // const uid = myFirebase.auth().currentUser.user.uid;
    // const db = myFirebase.firestore();
    // var userData;
    // var userDoc = db.collection("users")
    //   .doc(uid)
    //   .get()
    //   .then(doc => {
    //     userData = doc.data();
    //     console.log(userData);
    //     loading = false;
    //   })
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} style={{marginBottom: 10}}>
          <AlternateEmail />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
          Hello! Please check your email to confirm your account.
          </Typography>
          {/* <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={this.handleEmailChange}
          />
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={this.handlePasswordChange}
          /> */}
          <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={this.handleResendEmail}
          style={{marginTop: 10}}
          >
          Re-Send Email
          </Button>
          <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.Button}
          onClick={this.handleLogout}
          >Sign Out</Button>
        </Paper>
      </Container>
    );
    
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));