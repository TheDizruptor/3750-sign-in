import { myFirebase } from "../firebase/firebase";
import firebase from "firebase/app";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCEED = "LOGIN_SUCCEED";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCEED = "LOGOUT_SUCCEED";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCEED = "VERIFY_SUCCEED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCEED = "REGISTER_SUCCEED";
export const REGISTER_FAIL = "REGISTER_FAIL";

/* #region Login States */
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const successfulLogin = user => {
    return {
        type: LOGIN_SUCCEED,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAIL
    };
};
/* #endregion */

/* #region Logout States */
const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const successfulLogout = user => {
    return {
        type: LOGOUT_SUCCEED,
        user
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAIL
    };
};
/* #endregion */

/* #region Verification States */
const requestVerify = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const successfulVerify = () => {
    return {
        type: VERIFY_SUCCEED
    };
};
/* #endregion */

/* #region Registration States */
const requestRegister = user => {
    return {
        type: REGISTER_REQUEST,
        user
    }
}

const successfulRegister = user => {
    return {
        type: REGISTER_SUCCEED,
        user
    }
}

const registerError = () => {
    return {
        type: REGISTER_FAIL
    }
}
/* #endregion */

// firebase connection
const db = myFirebase.firestore();

// login authentification
export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(successfulLogin(user));
        })
        .catch(error => {
            // handle error
            dispatch(loginError());
        });
};

// logout
export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(successfulLogout());
        })
        .catch(error => {
            // handle error
            dispatch(logoutError());
        });
};

// registration verification
export const registerUser = (firstName, lastName, birthDate, email, password) => dispatch => {
    dispatch(requestRegister());
    myFirebase
        .auth()
        // create user in firebase
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            // store user information in database if user creation successful
            var uid = myFirebase.auth().currentUser.uid;
            if (uid != null) {
                var date = new Date(birthDate + "T00:00:00");
                var timestamp = new firebase.firestore.Timestamp.fromDate(date);
                db.collection("users").doc(uid).set({
                    FirstName: firstName,
                    LastName: lastName,
                    BirthDate: timestamp
                })
            }
            // trigger logging in user after registration
            dispatch(loginUser(email, password));
            myFirebase.auth().currentUser.sendEmailVerification();   
        })
        .catch(error => {
            // handle error
            dispatch(registerError());
        });
};

// verify authentification
export const verifyAuth = () => dispatch => {
    dispatch(requestVerify());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(successfulLogin(user));
        }
        dispatch(successfulVerify());
    });
};

