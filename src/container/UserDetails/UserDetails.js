
import React from 'react';
import { connect } from 'react-redux';
import classes from './UserDetails.module.css';
import moment from 'moment'

const UserDetails = ({user, isAuthenticated}) => {
    if(!user || !isAuthenticated) return null;
    return (
        <div className={classes.userDetailsWrapper}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={`${user.default_picture}`} alt='avatar' />               
                 </div>
                <div className={classes.username}> {user.name}</div>
            </div>
            <div className={classes.email}>
            <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>{user.email}</span></div>
            <div className={classes.joined}>
            <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>{moment().to(user.joined)}</span></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.login.user.user,
    isAuthenticated: state.isAuth.isAuthenticated
});

export default connect(mapStateToProps, null)(UserDetails);

