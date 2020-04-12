import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { getDraftPost, makePostPublic } from '../../../redux/actions/postsActions';
import { baseStaticUrl } from '../../../Config/Config';
import { withRouter } from "react-router-dom";

import Button from '../../../components/Button/Button';
import classes from './DraftPost.module.css';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const DraftPost = ({ getDraftPost, draftPost, makePostPublic, history }) => {

    const postId = new URLSearchParams(window.location.search).get('postId');

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    useEffect(() => {
        if (postId) {
            getDraftPost(postId)
        }
    }, [getDraftPost, postId]);

    const htmlData = useMemo(() => {
        return draftPost ? [converter.makeHtml(draftPost.body)] : null
    }, [converter, draftPost])

    const publish = () => {
        if (draftPost) {
            makePostPublic(postId);
            history.push(`/current-post?postId=${postId}`);
        }
    }

    return (
        <div>
            <div>
                <div className={classes.postWrapper}>
                    {draftPost ?
                        <>
                            <div className={classes.draftPost}>
                                <div className={classes.titleDraft}>
                                    This post is not published yet.
                                </div>
                            </div>
                            <div className={classes.postImage}>
                                <img src={`${baseStaticUrl}${draftPost.cover_image.name}`} alt='imageTitle' />
                            </div>
                            <div className={classes.bodyWrapper}>
                                <h1 className={classes.title}>{draftPost.title}</h1>
                                <div className={classes.userDetails}>
                                    <div className={classes.avatar}>
                                        <img src={`${draftPost.user.default_picture}`} alt='avatar' />
                                    </div>
                                    <div className={classes.username}>{draftPost.user.name}</div>
                                    <div className={classes.created}>
                                        <i className="fa fa-calendar" />
                                        {moment().to(draftPost.created)}
                                    </div>
                                    <div className={classes.tags}></div>
                                    <div className={classes.draftButtons}>
                                        <Button type='button' onClick={() => history.push(`/create-post?postId=${postId}`)}>EDIT</Button>
                                    </div>
                                    <div className={classes.draftButtons}>
                                        <Button type='button' onClick={publish}>PUBLISH</Button>
                                    </div>
                                </div>
                                <div className={classes.bodyText}>{ReactHtmlParser(htmlData)}</div>
                            </div>
                        </> : null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    draftPost: state.posts.draftPost,
});

const mapDispatchToProps = { getDraftPost, makePostPublic }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DraftPost));
