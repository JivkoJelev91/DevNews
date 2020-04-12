
import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.spinnerWrapper}>
            <div className={classes.backgroundSpinner}>
            <i className="fa fa-spinner fa-spin fa-5x" />
            </div>
        </div>
    )
}

export default Spinner;
