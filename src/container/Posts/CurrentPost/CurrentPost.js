
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { getCurrentPost, likePost } from '../../../redux/actions/postsActions';
import { submitComment } from '../../../redux/actions/commentsActions';
import { baseStaticUrl } from '../../../Config/Config';
import CreateComment from '../../Comments/CreateComment';
import classes from './CurrentPost.module.css';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const CurrentPost = ({ currentPost, getCurrentPost, submitComment, likePost, user, isAuthenticated }) => {

    const postId = new URLSearchParams(window.location.search).get('postId')

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const htmlData = useMemo(() => {
        return currentPost ? [converter.makeHtml(currentPost.body)] : null
    }, [converter, currentPost]);

    useEffect(() => {
        if (postId) {
            getCurrentPost(postId, user  ? user._id : null);
        }
    }, [getCurrentPost, postId, user, isAuthenticated])

    const likeDislikePost = (finalJudge) => {
        likePost(postId, finalJudge);
    }

    return (
        <div>
            <div className={classes.postWrapper}>
                {
                    currentPost ?
                        <>
                            <div className={classes.postImage}>
                                <img src={`${baseStaticUrl}${currentPost.cover_image.name}`} alt='imageTitle' />
                            </div>
                            <div className={classes.bodyWrapper}>
                                <h1 className={classes.title}>{currentPost.title}</h1>
                                <div className={classes.userDetails}>
                                    <div className={classes.avatar}>
                                        {console.log(currentPost.user)}
                                        <img src={`${currentPost.user.default_picture}`} alt='avatar' />
                                    </div>
                                    <div className={classes.username}>{currentPost.user.name}</div>
                                    <div className={classes.created}>
                                        <i className="fa fa-calendar" />
                                        {moment().to(currentPost.created)}
                                    </div>
                                    <div className={classes.likes} onClick={() => likeDislikePost('likes')}>
                                        <i className="fa fa-thumbs-up" />
                                        {currentPost.likes}
                                    </div>
                                    <div className={classes.dislikes} onClick={() => likeDislikePost('dislikes')}>
                                        <i className="fa fa-thumbs-down" />
                                        {currentPost.dislikes}
                                    </div>
                                    <div className={classes.dislikes}>
                                        <i className="fa fa-comment" />
                                        {currentPost.comments.length}
                                    </div>
                                    <div className={classes.tags}></div>
                                </div>
                                <div className={classes.bodyText}>{ReactHtmlParser(htmlData)}</div>
                            </div>
                        </> : null
                }
            </div>
            <CreateComment postId={postId} />
        </div>
    );
}


const mapStateToProps = state => ({
    currentPost: state.posts.currentPost,
    user: state.login.user.user,
    isAuthenticated: state.isAuth.isAuthenticated,
})

const mapDispatchToProps = {
    getCurrentPost,
    submitComment,
    likePost
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPost);
