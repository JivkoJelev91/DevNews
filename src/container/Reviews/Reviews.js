
import React from 'react';
import classes from './Reviews.module.css';

const Reviews = () => {
    return (
        <>
            <div className={classes.comments}>
                I'm a full-stack developer looking for projects to work on. I assume myself a JavaScript developer and I also love PHP.
                <div className={classes.tag}>#PHP</div>
            </div>
            <div className={classes.comments}>
                Hello,I am searching an Entry level Job preferrably in Android Development.
                <div className={classes.tag}>#PHP</div>
            </div>
            <div className={classes.comments}>
                Hi my name is Prathamesh. I like writing about Ruby and web development using Ruby. You can find some of my articles here - prathamesh.tech
                <div className={classes.tag}>#PHP</div>
            </div>
        </>
    );
}

export default Reviews;
