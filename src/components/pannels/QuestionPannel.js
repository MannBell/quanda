import React from 'react';
import { Link } from "react-router-dom";
import Moment from "moment";

const QuestionPannel = (props) => {

  const {
    question
    , upvoteQuestion
    , downvoteQuestion
    , myUid
  } = props;

  const iVoted = {
    up: question.upvotes.includes(myUid)
    , down: question.downvotes.includes(myUid)
  }

  return (
    <div className="card bg-dark text-light">
      <div className="card-body">
        <div className="d-flex align-items-center mb-4">
          <Link to={`/profile/${question.asker.id}`} className={`h1 mb-0 text-decoration-none initials-circle flex-shrink-0 text-dark bg-info rounded-circle d-flex justify-content-center align-items-center me-3`}>
            {`${question.asker.firstname[0]}${question.asker.lastname[0]}`}
          </Link>
          <h1 className="card-title text-info">
            { question.title }
          </h1>
        </div>
        <div className="d-flex">
          <div className="voting-pannel text-center ms-2 me-5">
            {/* Upvote Question */}
            <button
              onClick={ upvoteQuestion.bind(this, question.id) }
              className="p-0 px-1 btn btn-lg btn-success"
            >
              <i className={`fas fa-chevron-circle-up${ iVoted.up ? " text-info" : "" }`}></i>
            </button>
            <p className="my-2">
              { question.upvotes.length - question.downvotes.length }
            </p>
            {/* Downvote Question */}
            <button
              onClick={ downvoteQuestion.bind(this, question.id) }
              className="p-0 px-1 btn btn-lg btn-danger"
            >
              <i className={`fas fa-chevron-circle-down${ iVoted.down ? " text-info" : "" }`}></i>
            </button>
          </div>
          <p className="mb-0 lead">{question.content}</p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <span className="text-muted">Date: {Moment(question.createdAt.toDate()).calendar()}</span>
      </div>
    </div>
  )
}

export default QuestionPannel;