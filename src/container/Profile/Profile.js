
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classes from './Profile.module.css';

const Profile = ({ user }) => {
    if (!user) return null;
    return (
        <div className={classes.profileWrapper}>
            <div className={classes.profileImg}>
                <img src={`${user.default_picture}`} alt='avatar' />
            </div>
            <div className={classes.profileDetails}>
                <div>
                    <div>Username:</div>
                    <div>Email:</div>
                    <div>Joined:</div>
                    <div>Platform:</div>
                </div>
                <div>
                    <div className={classes.profileName}>{user.name}</div>
                    <div className={classes.profileEmail}>{user.email}</div>
                    <div className={classes.joined}>{moment().to(user.joined)}</div>
                    <div className={classes.platform}>Facebook</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.login.user.user
});

export default connect(mapStateToProps, null)(Profile);
