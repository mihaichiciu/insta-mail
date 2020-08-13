import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import NewSurvey from './survey/NewSurvey';
import PrivateRoute from './PrivateRoute';

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
            <Switch>
              <Route exact path={'/'} component={Landing} />
              <PrivateRoute exact path="/surveys">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/surveys/new">
                <NewSurvey />
              </PrivateRoute>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
