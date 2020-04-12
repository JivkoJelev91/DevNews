import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUserAuth, getToken } from './redux/actions/AuthActions';
import { getProfile } from './redux/actions/loginActions';

import Layout from './container/Layout/Layout';
import CurrentPost from './container/Posts/CurrentPost/CurrentPost';
import Header from './container/Header/Header';
import Profile from './container/Profile/Profile';
import CreatePost from './container/Posts/CreatePost/CreatePost';
import DraftPost from './container/Posts/DraftPost/DraftPost';
import ErrorPage from './components/ErrorPage/ErrorPage';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Notification from './components/Notification/Notification'

const App = ({ getToken, checkUserAuth, isAuthenticated, getProfile }) => {
  
  checkUserAuth()

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(getToken())
    }
  }, [getProfile, getToken, isAuthenticated]);

  return (
    <Fragment>
      <Notification />
      <Header />
      <Switch>
        <Route path="/" component={Layout} exact />
        <Route path="/current-post" component={CurrentPost} />
        <Route path="/create-post" component={RequireAuth(CreatePost)} />
        <Route path="/draft-post" component={RequireAuth(DraftPost)} />
        <Route path="/profile" component={Profile} />
        <Route component={ErrorPage} />
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuth.isAuthenticated,
});

const mapDispatchToProps = {
  getProfile,
  getToken, 
  checkUserAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
