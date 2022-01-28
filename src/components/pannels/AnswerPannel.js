import React from 'react';
import { Link } from "react-router-dom";
import Moment from "moment";

const AnswerPannel = (props) => {
  const {
    answer
    , upvoteAnswer
    , downvoteAnswer
    , deleteAnswer
    , myUid
  } = props;

  const iVoted = {
    up: answer.upvotes.includes(myUid)
    , down: answer.downvotes.includes(myUid)
  }

  return (
    <div className="card bg-dark text-light mt-5">
      <div className="card-body">
        <div className="d-flex align-items-center mb-4">
          <Link to={`/profile/${answer.answerer.id}`} className={`h1 mb-0 text-decoration-none initials-circle flex-shrink-0 text-dark bg-info rounded-circle d-flex justify-content-center align-items-center me-3`}>
            {`${ answer.answerer.firstname[0] }${ answer.answerer.lastname[0] }`}
          </Link>
          <div>
            <Link to={`/profile/${answer.answerer.id}`} className="h1 text-decoration-none card-title text-info mb-0">
              {`${ answer.answerer.firstname } ${ answer.answerer.lastname }`}
            </Link><br/>
            <span className="text-muted">{ answer.answerer.profession }</span>
          </div>
          {/* Delete button */}
          {
            answer.answerer.id === myUid &&
            <button
              onClick={ deleteAnswer.bind(this, answer.id) }
              className="ms-auto btn btn-danger align-self-start"
            >
              <i className="fas fa-trash text-light"></i>
            </button>
          }
        </div>
        <div className="d-flex">
          <div className="voting-pannel text-center ms-2 me-5">
            {/* Upvote Answer */}
            <button
              className="p-0 px-1 btn btn-lg btn-success"
              onClick={ upvoteAnswer.bind(this, answer.id) }
            >
              <i className={`fas fa-chevron-circle-up${ iVoted.up ? " text-info" : "" }`}></i>
            </button>
            <p className="my-2">{ answer.upvotes.length - answer.downvotes.length }</p>
            {/* Downvote Answer */}
            <button
              className="p-0 px-1 btn btn-lg btn-danger"
              onClick={ downvoteAnswer.bind(this, answer.id) }
            >
              <i className={`fas fa-chevron-circle-down${ iVoted.down ? " text-info" : "" }`}></i>
            </button>
          </div>
          <p className="mb-0">{ answer.content }</p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <span className="text-muted">Date: { Moment(answer.createdAt.toDate()).calendar() }</span>
      </div>
    </div>
  )
}

export default AnswerPannel;