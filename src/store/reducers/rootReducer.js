import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";

const rootReducer = combineReducers({
  auth: authReducer
  , questionState: questionReducer
  , answerState: answerReducer
  , firebase: firebaseReducer
  , firestore: firestoreReducer
});

export default rootReducer;