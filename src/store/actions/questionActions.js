import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore"; // because it is not available in the /compat

export const createQuestion = (questionObj) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const {
      auth: { uid: myUid }
      , profile: { firstname, lastname }
    } = getState().firebase;

    firestore
    .collection("questions")
    .doc(questionObj.id)
    .set({
      ...questionObj
      , asker: { id: myUid, firstname, lastname }
      , upvotes: [], downvotes: []
      , createdAt: new Date()
    })
    .then(() => {
      dispatch({
        type: "CREATE_QUESTION_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "CREATE_QUESTION_ERROR"
        , err
      })
    })
  };
}

export const upvoteQuestion = (questionId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
    
    const { auth: { uid: myUid } } = getState().firebase;

    const doc = firestore.collection("questions").doc(questionId);
    
    updateDoc(doc, {
      downvotes: arrayRemove(myUid)
      , upvotes: arrayUnion(myUid)
    })
    .then(() => {
      dispatch({
        type: "UPVOTE_QUESTION_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "UPVOTE_QUESTION_ERROR"
        , err
      })
    })
  };
}

export const downvoteQuestion = (questionId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
    
    const { auth: { uid: myUid } } = getState().firebase;

    const doc = firestore.collection("questions").doc(questionId);
    
    updateDoc(doc, {
      upvotes: arrayRemove(myUid)
      , downvotes: arrayUnion(myUid)
    })
    .then(() => {
      dispatch({
        type: "DOWNVOTE_QUESTION_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DOWNVOTE_QUESTION_ERROR"
        , err
      })
    })
  };
}