import React from 'react';
import { Link } from "react-router-dom";

const HomeCard = ({ title, content, icon, link }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <Link to={ link } className="h-100 card text-center bg-dark text-info text-decoration-none">
        <div className="card-body">
          <div className="h1">
            <i className={ icon }></i>
          </div>
          <h3 className="card-title">
            { title }
          </h3>
          <p className="card-text text-light">
            { content }
          </p>
        </div>
      </Link>
    </div>
  )
}

export default HomeCard;