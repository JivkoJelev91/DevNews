
import React from 'react';
import { connect } from 'react-redux';
import { loginFacebook } from '../../redux/actions/loginActions';

import logo from '../../resources/logo.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import classes from './Login.module.css';

const Login = ({ setOpenLoginModal, loginFacebook, closeModal }) => {
    const responseLoginCallback = async (profile) => {
        await loginFacebook({
            platform: 'facebook',
            profile: profile
        })
        await setOpenLoginModal(false);
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div>
            <div className={classes.loginWrapper}>
                <div className={classes.closeModal} onClick={closeModal}>
                    <i className="fa fa-close fa-lg"></i>
                </div>
                <div className={classes.logo}>
                    <img src={logo} alt='logo' />
                </div>
                <FacebookLogin
                    icon="fa-facebook"
                    appId="2025047431125603"
                    fields="name,email,picture"
                    callback={responseLoginCallback}
                    render={renderProps => (
                        <div className={`${classes.btn} ${classes.fb}`} onClick={renderProps.onClick}>
                            <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                        </div>
                    )}
                />
                <GoogleLogin
                    clientId="519535629799-ti1k0deje4kpraar01j3e452s5bq96a5.apps.googleusercontent.com"
                    render={renderProps => ( 
                        <div className={`${classes.btn} ${classes.google}`} onClick={renderProps.onClick}>
                            <i className="fa fa-google fa-fw"></i> Login with Google+
                        </div>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
                <div className={`${classes.btn} ${classes.twitter}`}>
                    <i className="fa fa-twitter fa-fw"></i> Login with Twitter
                </div>

                <div className={`${classes.btn} ${classes.github}`}>
                    <i className="fa fa-github fa-fw"></i> Login with Github
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = { loginFacebook }

export default connect(null, mapDispatchToProps)(Login);
