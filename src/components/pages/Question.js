import React from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
// Components
import QuestionPannel from "../pannels/QuestionPannel";
import AnswerForm from "../pannels/AnswerForm";
import AnswersList from "../lists/AnswersList";
// Actions
import { upvoteQuestion, downvoteQuestion } from "../../store/actions/questionActions";
import { upvoteAnswer, downvoteAnswer, deleteAnswer } from "../../store/actions/answerActions";


const Question = (props) => {

  if(!props.firebaseAuth.uid) return <Redirect to="/"/>

  const {
    questions
    , answers
    , upvoteQuestion
    , downvoteQuestion
    , upvoteAnswer
    , downvoteAnswer
    , deleteAnswer
    , firebaseAuth: { uid: myUid }
    , match: { params: { questionId } }
  } = props;

  return (
    <main id="about" className="pt-5 mb-5 p-sm-5 nav-margin">
      <div className="container container-small">
        {/* Question */}
        {
          isLoaded(questions) && isLoaded(questions[questionId])
            ? isEmpty(questions[questionId])
              ? null
              : <QuestionPannel
                  question={ questions[questionId] }
                  upvoteQuestion={ upvoteQuestion }
                  downvoteQuestion={ downvoteQuestion }
                  myUid={ myUid }
                />
            : <div className="mt-5 d-block text-center">
                <span className="text-info spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
              </div>
        }
        {/* Answer Form */}
        <AnswerForm questionId={ questionId } />
        {/* Answers */}
        {
          isLoaded(answers)
            ? <AnswersList
                answers={ answers }
                upvoteAnswer={ upvoteAnswer }
                downvoteAnswer={ downvoteAnswer }
                deleteAnswer={ deleteAnswer }
                myUid={ myUid }
                questionId={ questionId }
              />
            : <div className="mt-5 d-block text-center">
                <span className="text-info spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
              </div>
        }
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return ({
    firebaseAuth: state.firebase.auth
    , questions: state.firestore.data.questions
    , answers: state.firestore.data.answers
  });
}

const mapDispatchToProps = (dispatch) => ({
  // Question
  upvoteQuestion: (questionId) => dispatch(upvoteQuestion(questionId))
  , downvoteQuestion: (questionId) => dispatch(downvoteQuestion(questionId))
  // Answer
  , upvoteAnswer: (answerId) => dispatch(upvoteAnswer(answerId))
  , downvoteAnswer: (answerId) => dispatch(downvoteAnswer(answerId))
  , deleteAnswer: (answerId) => dispatch(deleteAnswer(answerId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  , firestoreConnect(({ firebaseAuth: { uid } }) => {
      return uid
        ? [
            {
              collection: "questions"
              , storeAs: "questions"
            },
            {
              collection: "answers"
              , storeAs: "answers"
            }
          ]
        : []
  })
)(Question);