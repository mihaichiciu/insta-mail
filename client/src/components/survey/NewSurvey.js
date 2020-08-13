import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveryFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class NewSurvey extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveryFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    } else {
      return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm',
})(NewSurvey);
