import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
   const RequireAuth = ({ isAuthenticated, history }, props) => {
      useEffect(() => {
         if (!isAuthenticated) {
            history.replace('/')
         }
      }, [isAuthenticated, history]);

      return (
         <ComposedComponent {...props} />
      )
   }
   const mapStateToProps = (state) => ({
      isAuthenticated: state.isAuth.isAuthenticated
   });
   return connect(mapStateToProps)(withRouter(RequireAuth));
}
