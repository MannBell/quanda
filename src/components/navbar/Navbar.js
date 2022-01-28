import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// Components
import GuestModal from "../modals/GuestModal";
// Actions
import { signIn, signOut } from "../../store/actions/authActions";

const Navbar = (props) => {

  const {
    firebaseAuth
    , firebaseProfile: { firstname, lastname, isLoaded: isLoadedProfile, isEmpty: isEmptyProfile }
    // Actions
    , signIn
    , signOut
  } = props;

  return (
    <div>
      <nav className="fixed-top navbar navbar-expand-md navbar-dark bg-dark lead">
        <div className="container">
          <Link to="/" className="text-info navbar-brand">
            Quanda<i className="fas fa-comments"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {
            firebaseAuth.uid
              ? (
                  <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                    <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                      <li className="nav-item">
                        <Link to="/home" className={`lead nav-link`}>
                          <i className="fas fa-home"></i> Home
                        </Link>
                      </li>
                      <li className="nav-item mx-md-2 mx-lg-5">
                        <Link to="/ask-question" className={`lead nav-link text-info`}>
                          Ask a Question <i className="fas fa-comment"></i>
                        </Link>
                      </li>
                      {
                        isLoadedProfile
                          ? isEmptyProfile
                            ? null
                            : (
                                <li className="nav-item d-flex align-items-center py-2 py-md-0">
                                  <Link to={`/profile/${firebaseAuth.uid}`} className={`bg-secondary nav-link initials-circle flex-shrink-0 text-dark rounded-circle d-flex justify-content-center align-items-center me-2`}>
                                    {firstname[0]}{lastname[0]}
                                  </Link>
                                </li>
                              )
                          : <div className="spinner-border text-primary"></div>
                      }
                      <li>
                        <span
                          onClick={ signOut }
                          style={{cursor: "pointer"}}
                          className="text-danger cursor-pointer ms-md-2 ms-lg-5"
                        >
                          Sign Out <i className="fas fa-sign-out-alt"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
              )
              : (
                  <div id="navmenu" className="collapse navbar-collapse text-center text-md-start">
                    <ul className="d-flex align-items-center justify-content-between navbar-nav text-secondary ms-auto">
                      <li className="nav-item">
                        <Link to="/signin" className="nav-link">
                          Sign In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/signup" className="nav-link text-info">
                          Sign Up
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button
                          type="button"
                          className="ms-md-3 mt-3 mt-md-0 btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#guestModal"
                        >Guest?!</button>
                      </li>
                    </ul>
                  </div>
              )
          }
        </div>
      </nav>
      <GuestModal signIn={signIn} myUid={firebaseAuth.uid}/>
    </div>
  )
}

const mapStateToProps = ({ firebase }) => {
  return ({
    firebaseAuth: firebase.auth
    , firebaseProfile: firebase.profile
  })
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
  , signIn: (newUser) => dispatch(signIn(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);