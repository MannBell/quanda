import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
// Components
import QuestionCard from "../cards/QuestionCard";
// Functions
import sortVoting from "../../myPlugins/functions/sortVoting";
import cleanEmpty from "../../myPlugins/functions/cleanEmpty";
import spreadObj from "../../myPlugins/functions/spreadObj";


class Profile extends Component {

  state={ sortBy: "random" }

  handleSorting = ({ target }) => {
    this.setState({ sortBy: target.value })
  }

  render() {
    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>
    
    const {
      firebaseAuth: { uid: myUid }
      , match: { params: { profileId } }
      , questions: rawQuestions
      , user
    }=this.props;

    const questions = isLoaded(rawQuestions)
                      ? ((questions)=>{
                          switch(this.state.sortBy) {
                            case "high"
                            : return sortVoting(questions);
                            case "low"
                            : return sortVoting(questions, { asc: true });
                            default
                            : return questions
                          }
                        })(cleanEmpty(spreadObj(rawQuestions)).filter((question) => question.asker.id === profileId))
                      : undefined;

    
    const { firstname, lastname } = isLoaded(user) && !isEmpty(user) 
                                      ? user
                                      : {firstname:"...", lastname:"..."};

    return (
      <main className="nav-margin bg-secondary mb-5 pt-5">
        <div className="container">
          <div className="pt-3">
            <section style={{ maxWidth:"max-content" }} className="card ms-auto bg-dark mb-5">
              <div className="card-body d-flex align-items-center justify-content-end">
                <h1 className="card-title text-light p-2">
                  {firstname} {lastname}
                </h1>
                <div className="h1 bg-light nav-link initials-circle flex-shrink-0 text-dark rounded-circle d-flex justify-content-center align-items-center mb-0 me-2">
                  {`${firstname[0]}${lastname[0]}`}
                </div>
              </div>
            </section>
            {/* Questions */}
            <section id="about">
              <div className="container">
              {/* Sorter */}
              <div className="input-group mb-5 d-flex justify-content-end">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="sortBy">
                  Sort By<i className="fas fa-sort-amount-down ms-2"></i></label>
                </div>
                <select id="sortBy" onChange={this.handleSorting} className="custom-select">
                  <option value="random">Randomly</option>
                  <option value="high">High votes first</option>
                  <option value="low">low votes first</option>
                </select>
              </div>
                <div className="row gy-5 g-sm-5">
                  {
                    isLoaded(questions)
                      ? isEmpty(questions)
                        ? <div>{ myUid === profileId ? "You have" : "This is user has"}n't made any questions yet!</div>
                        : questions.map((question) => {
                            return (
                              <QuestionCard
                                isProfile={ true }
                                key={ question.id }
                                id={ question.id }
                                title={ question.title }
                                content={ question.content }
                                asker={ question.asker }
                                upvotes={ question.upvotes.length - question.downvotes.length }
                                createdAt={ question.createdAt }
                                category={ question.category }
                              />
                            );
                        })
                      : <div className="mt-5 d-block text-center">
                          <span className="text-info spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                          <span className="sr-only">Loading...</span>
                        </div>

                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = ({ firebase: { auth: firebaseAuth }, firestore: { data: { questions, user } } }) => ({
  firebaseAuth
  , questions
  , user
});

export default compose(
  connect(mapStateToProps)
  , firestoreConnect(({ firebaseAuth: { uid }, match: { params: { profileId } } }) => {

    return uid
      ? [
        { collection: "users", doc: profileId, storeAs: "user" }
        , { collection: "questions", storeAs: "questions" }
      ]
      : []
  })
)(Profile);