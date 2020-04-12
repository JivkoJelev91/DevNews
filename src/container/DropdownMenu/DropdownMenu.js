
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import classes from './DropdownMenu.module.css';

const DropdownMenu = ({ logout, history }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            <div className={classes.arrowUpOuter}>
                <div className={classes.arrowUpInner} style={{
                    borderColor: `transparent transparent ${isHover ? '#55ACEE' : '#fff'} transparent`
                }}></div>
            </div>
            <div className={classes.dropdown}>
                <div className={classes.profile}
                    onClick={() => history.push('/profile')}
                    onMouseOver={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <i className="fa fa-user" />Profile
                </div>
                <div onClick={() => history.push('/')}><i className="fa fa-home" />Dashboard</div>
                <div onClick={() => history.push('/create-post')}><i className="fa fa-plus" />Make a post</div>
                <div onClick={logout}><i className="fa fa-sign-out" />Sign out</div>
            </div>
        </>
    );
}

export default withRouter(DropdownMenu);
