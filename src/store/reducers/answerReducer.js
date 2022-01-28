import stripFB from "../../myPlugins/functions/stripFB";

const initState = {
  createAnswerSuccess: false
  , createAnswerErr: ""
};

const answerReducer = (state=initState, action) => {
  switch(action.type) {
    case "CREATE_ANSWER_STATUS_RESET"
    : {
      return ({ ...state, createAnswerSuccess: false });
    }
    case "CREATE_ANSWER_SUCCESS"
    : {
      return ({ ...state, createAnswerSuccess: true, createAnswerErr: "" });
    }
    case "CREATE_ANSWER_ERROR"
    : {
      return ({ ...state, createAnswerErr: stripFB(action.err.message) });
    }
    case "CLEAR_CREATE_ANSWER_ERROR"
    : {
      return ({ ...state, createAnswerErr: "" });
    }
    default
    : return state;
  }
}

export default answerReducer;