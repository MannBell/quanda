import stripFB from "../../myPlugins/functions/stripFB";

const initState = {
  createQuestionSuccess: false
  , createQuestionErr: ""
};

const questionReducer = (state=initState, action) => {
  switch(action.type) {
    case "CREATE_QUESTION_STATUS_RESET"
    : {
      return ({ ...state, createQuestionSuccess: false });
    }
    case "CREATE_QUESTION_SUCCESS"
    : {
      return ({ ...state, createQuestionSuccess: true, createQuestionErr: "" });
    }
    case "CREATE_QUESTION_ERROR"
    : {
      return ({ ...state, createQuestionErr: stripFB(action.err.message) });
    }
    case "CLEAR_CREATE_QUESTION_ERROR"
    : {
      return ({ ...state, createQuestionErr: "" });
    }
    default
    : return state;
  }
}

export default questionReducer;