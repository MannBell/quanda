import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
// Components
import QuestionCard from "../cards/QuestionCard";
// Constants
import { categoriesIcons } from "../../myPlugins/constants/categoriesIcons";
// Functions
import sortVoting from "../../myPlugins/functions/sortVoting";
import cleanEmpty from "../../myPlugins/functions/cleanEmpty";
import spreadObj from "../../myPlugins/functions/spreadObj";

class Category extends Component {

  state={ sortBy: "random" }

  handleSorting = ({ target }) => {
    this.setState({ sortBy: target.value })
  }

  render() {
    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>
    if(!categoriesIcons[this.props.match.params.category]) return <Redirect to="/404"/>

    const {
      match: { params: { category } }
      , questions: rawQuestions
    } = this.props;

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
                        })(cleanEmpty(spreadObj(rawQuestions)).filter((question) => question.category === category ))
                      : undefined;

    return (
      <main id="about" className="p-sm-5 pt-5 mb-5 nav-margin">
        <div className="container">
          <section style={{ maxWidth:"max-content" }} className="card bg-dark">
            <div className="card-body">
              <h1 className="text-info"><i className={categoriesIcons[category]}></i> { category.replace(/^\w/, m => m.toUpperCase()) }</h1>
            </div>
          </section>
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
                  ? <div>There are no questions in this category yet!</div>
                  : questions.map((question) => {
                    return (
                      <QuestionCard
                        key={ question.id }
                        id={ question.id }
                        title={ question.title }
                        content={ question.content }
                        asker={ question.asker }
                        upvotes={ question.upvotes.length - question.downvotes.length }
                        createdAt={ question.createdAt }
                        category={ category }
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
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    firebaseAuth: state.firebase.auth
    , questions: state.firestore.data.questions
  });
}

export default compose(
  connect(mapStateToProps)
  , firestoreConnect(({ firebaseAuth: { uid } }) => {
      return  uid
        ? [
            {
              collection: "questions"
              , storeAs: "questions"
            }
          ]
        : []
  })
)(Category);