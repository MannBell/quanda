import { v4 as uuidv4 } from "uuid";
import { arrayUnion, arrayRemove, updateDoc } from "firebase/firestore"; // because it is not available in the /compat

export const createAnswer = ({ content, questionId }) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const {
      auth: { uid: myUid }
      , profile: { firstname, lastname, profession }
    } = getState().firebase;

    const answerId = uuidv4();

    firestore
    .collection("answers")
    .doc(answerId)
    .set({
      id: answerId
      , content
      , answerer: { id: myUid, firstname, lastname, profession }
      , upvotes: [], downvotes: []
      , createdAt: new Date()
      , questionId
    })
    .then(() => {
      dispatch({
        type: "CREATE_ANSWER_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "CREATE_ANSWER_ERROR"
        , err
      })
    })
  };
}

export const upvoteAnswer = (answerId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
    
    const { auth: { uid: myUid } } = getState().firebase;

    const doc = firestore.collection("answers").doc(answerId);
    
    updateDoc(doc, {
      downvotes: arrayRemove(myUid)
      , upvotes: arrayUnion(myUid)
    })
    .then(() => {
      dispatch({
        type: "UPVOTE_ANSWER_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "UPVOTE_ANSWER_ERROR"
        , err
      })
    })


  };
}

export const downvoteAnswer = (answerId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
    
    const { auth: { uid: myUid } } = getState().firebase;

    const doc = firestore.collection("answers").doc(answerId);
    
    updateDoc(doc, {
      upvotes: arrayRemove(myUid)
      , downvotes: arrayUnion(myUid)
    })
    .then(() => {
      dispatch({
        type: "DOWNVOTE_ANSWER_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DOWNVOTE_ANSWER_ERROR"
        , err
      })
    })
  };
}

export const deleteAnswer = (answerId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    firestore
    .collection("answers")
    .doc(answerId)
    .set({})
    .then(() => {
      dispatch({
        type: "DELETE_ANSWER_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DELETE_ANSWER_ERROR"
        , err
      })
    })
  };
}