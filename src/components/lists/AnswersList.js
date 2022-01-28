import React from 'react';
import { isEmpty } from 'react-redux-firebase';
// Components
import AnswerPannel from "../pannels/AnswerPannel";
// Functions
import spreadObj from "../../myPlugins/functions/spreadObj";
import cleanEmpty from "../../myPlugins/functions/cleanEmpty";
import sortVoting from "../../myPlugins/functions/sortVoting";


const AnswersList = (props) => {

  const {
    answers: rawAnswers
    , upvoteAnswer
    , downvoteAnswer
    , deleteAnswer
    , myUid
    , questionId
  } = props;

  const answers = sortVoting(cleanEmpty(spreadObj(rawAnswers)).filter((answer) => answer.questionId === questionId ));

  return isEmpty(answers)
    ? <div>No answers yet...</div>
    : answers.map((answer) => (
        <AnswerPannel
          key={ answer.id }
          answer={ answer }
          upvoteAnswer={ upvoteAnswer }
          downvoteAnswer={ downvoteAnswer }
          deleteAnswer={ deleteAnswer }
          myUid={ myUid }
        />
    ))
}


export default (AnswersList);