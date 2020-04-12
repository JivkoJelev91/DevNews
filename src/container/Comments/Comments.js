
import React from 'react';
import classes from './Comments.module.css';
import Button from '../../components/Button/Button';

const Comments = ({ user }) => {
    return (
        <div className={classes.commentWrapper}>
            <div className={classes.userDetails}>
                <div className={classes.avatar}>
                    {/* <img src={`${user.default_picture}`} alt='avatar' /> */}
                    <div></div>
                </div>
                <div className={classes.username}>
                    {/* {user.name} */}
                    Gocho Gochev
                </div>
                <div className={classes.platform}>
                    <i className='fa fa-github' />
                </div>
                <div className={classes.created}>
                    5 days ago
                    {/* <span>{moment().to(user.joined)}</span></div> */}
                </div>
            </div>
            <div className={classes.commentText}>
                In the corporate world you gotta do Angular
                where modules and imports need to be structured.
                If you're looking to build something quickly,
                React is the way to go. But React Router is a bit
                of a headache and wrapping your head around other
                frameworks that you need to incorporate is
                a bit tricky, namely Redux, React-Redux.
                Documentation is garbo too
            </div>
            <div className={classes.preview}>
                <div className={classes.likeDislike}>
                    <div>
                        <i className="fa fa-thumbs-up" />
                    </div>
                    <div>
                        <i className="fa fa-thumbs-down" />
                    </div>
                </div>
                <div>
                    <Button
                        type={'button'}
                        onClick={() => console.log('reply')}>
                        REPLY
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Comments;
