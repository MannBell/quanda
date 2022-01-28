import React from 'react';
import { Link } from "react-router-dom";
import Moment from "moment";
// Constants
import { categoriesIcons } from "../../myPlugins/constants/categoriesIcons";

const QuestionCard = (props) => {
  const {
    isProfile
    , id
    , title
    , content
    , asker
    , upvotes
    , createdAt
    , category
  } = props;

  return (
    <div className="col-lg-6">
      <div className="h-100 card bg-dark">
        {
          isProfile
          &&
          <div className="card-header text-light d-flex justify-content-between">
            <span className="h5 mb-0"><i className={categoriesIcons[category]}></i> { category }</span>
            <span className="mb-0">Upvotes: { upvotes }</span>
          </div>
        }
        <Link to={ `/question/${id}` } className="card-body text-info text-decoration-none">
          <h1 className="card-title">
            { title }
          </h1>
          <p className="card-text text-light">
            { content }
          </p>
        </Link>
        {
          !isProfile
          &&
          <div className="card-footer text-light d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link to={`/profile/${asker.id}`} className={`h4 mb-0 text-decoration-none initials-circle flex-shrink-0 text-dark bg-info rounded-circle d-flex justify-content-center align-items-center me-3`}>
                {`${asker.firstname[0]}${asker.lastname[0]}`}
              </Link>
              <div>
                <p className="mb-0">Posted by: 
                  <Link className="text-info" to={`/profile/${asker.id}`}> 
                    {`${asker.firstname} ${asker.lastname}`}
                  </Link>
                </p>
                <p className="mb-0">Date: { Moment(createdAt.toDate()).calendar() }</p>
              </div>
            </div>
            <div>
              <p className="mb-0">Upvotes:<br/>{ upvotes }</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default QuestionCard;