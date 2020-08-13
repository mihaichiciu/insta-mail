import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import NewSurvey from './survey/NewSurvey';

class App extends Component {
  componentDidMount() {
    //dupa ce am facut connect la actions jos, toate actiunile se gasesc in this.props
    this.props.fetchUser();
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={NewSurvey} />
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default connect(null, actions)(App);
