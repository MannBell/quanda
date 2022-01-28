import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
// Actions
import { createQuestion } from "../../store/actions/questionActions";

class AskQuestion extends Component {
  
  state = {
    question: {
      id: uuidv4()
      , title: ""
      , content: ""
      , category: ""
    }
    , loading: false
  }

  handleChange = ({ target: { id, value } }) => {
    this.state.loading && this.setState({ loading: false });
    this.setState((state) => ({
      question: { ...state.question, [id]: value } 
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createQuestion, clearError }=this.props;
    clearError("CLEAR_CREATE_QUESTION_ERROR");
    
    createQuestion(this.state.question);
    this.setState({ loading: true });
  }

  render() {

    if(!this.props.firebaseAuth.uid) return <Redirect to="/"/>

    const { questionState: { createQuestionSuccess, createQuestionErr }, resetCreateStatus } = this.props;
    // If question has been created successfully, redirect to /question
    if(createQuestionSuccess) {
      resetCreateStatus("CREATE_QUESTION_STATUS_RESET");
      return <Redirect to={`/question/${ this.state.question.id }`} />
    };

    return (
      <main className="nav-margin p-sm-5 mb-5 pt-5">
        <div className="container container-small">
          <form onSubmit={this.handleSubmit} className="card form">
            <div className="card-body">
              <h1 className="text-dark card-title pb-5">Ask a New Question</h1>
              {/* Select */}
              <label className="text-dark form-label lead" htmlFor="category">
                <i className="fas fa-tag ms-2"></i> Choose a category:
              </label>
              <select required id="category" onChange={this.handleChange} className="d-block form-control mb-3">
                <option value="">none</option>
                <option value="science">Science</option>
                <option value="art">Art</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="biology">Biology</option>
                <option value="gaming">Gaming</option>
                <option value="coding">Coding</option>
                <option value="jobs">Jobs</option>
                <option value="history">History</option>
              </select>
              {/* <!-- Title -->  */}
              <label className="text-dark form-label lead" htmlFor="title">Title:</label>
              <input required onChange={ this.handleChange } className="mb-3 form-control" type="text" id="title"/>
              {/* <!-- Content --> */}
              <label className="text-dark form-label lead" htmlFor="content">Content:</label>
              <textarea onChange={this.handleChange} required className="mb-3 form-control" id="content"></textarea>
              {/* Button */}
              <div className="d-flex">
                <button className="ms-auto my-3 btn-lg btn btn-info px-sm-5" type="submit">
                  Ask
                  {
                    this.state.loading && !createQuestionErr
                    &&
                    (
                      <span className="ms-3">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Loading...</span>
                      </span>
                    )
                  }
                </button>
              </div>
              {
                createQuestionErr
                &&
                <p className="text-danger text-center">
                  {createQuestionErr}
                </p>
              }
            </div>
          </form>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ questionState, firebase: { auth: firebaseAuth } }) => {
  return ({ questionState, firebaseAuth });
}

const mapDispatchToProps = (dispatch) => ({
  createQuestion: (question) => dispatch(createQuestion(question))
  , resetCreateStatus: (type) => dispatch({ type })
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);