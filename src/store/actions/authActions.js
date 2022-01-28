export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    
    const firebase = getFirebase();

    firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGN_OUT_SUCCESS" });
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_OUT_ERROR"
        , err
      })
    })

  }
}

export const signUp = ({ email, password, firstname, lastname, profession }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user: { uid }}) => {
      return (
        firestore
        .collection("users")
        .doc(uid)
        .set({ firstname, lastname, profession })
      );
    })
    .then(() => {
      dispatch({ type: "SIGN_UP_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "SIGN_UP_ERROR", err })
    })

  }
}

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    
    const firebase = getFirebase();

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: "SIGN_IN_SUCCESS"
        , email
        , password
      })
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_IN_ERROR"
        , err
      })
    })

  }
}