import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { createAnswer } from "../../store/actions/answerActions";

export class AnswerForm extends Component {

  state={
    content: ""
    , loading: false
  }

  componentDidMount() {
    this.props.resetCreateStatus("CREATE_ANSWER_STATUS_RESET");
    this.props.clearError("CLEAR_CREATE_ANSWER_ERROR");
  }

  componentDidUpdate() {
    if(this.props.answerState.createAnswerSuccess) {
      this.setState({ loading: false, content: "" });
      this.props.resetCreateStatus("CREATE_ANSWER_STATUS_RESET");
    };
  }

  handleChange = ({ target: { id, value } }) => {
    this.state.loading && this.setState({ loading: false });
    this.setState({[id]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createAnswer, clearError, questionId } = this.props;
    clearError("CLEAR_CREATE_ANSWER_ERROR");
    
    createAnswer({ content: this.state.content, questionId });
    this.setState({ loading: true });
  }

  render() {

    const { answerState: {createAnswerErr} } = this.props;

    return (
      <form onSubmit={ this.handleSubmit } className="card form bg-dark mt-4">
        <div className="card-body">
          {/* <!-- Text --> */}
          <textarea
            onChange={ this.handleChange }
            value={ this.state.content }
            className="mb-3 form-control" id="content"
            required
          />
          <button className="btn btn-info d-block ms-auto">
            Answer
            {
              this.state.loading && !createAnswerErr
              &&
              (
                <span className="ms-3">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="sr-only">Loading...</span>
                </span>
              )
            }
          </button>
          {
            createAnswerErr
            &&
            <p className="text-danger text-center">
              {createAnswerErr}
            </p>
          }
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ answerState }) => {
  return ({ answerState });
}

const mapDispatchToProps = (dispatch) => ({
  createAnswer: (answerObj) => dispatch(createAnswer(answerObj))
  , resetCreateStatus: (type) => dispatch({ type })
  , clearError: (type) => dispatch({ type })
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);