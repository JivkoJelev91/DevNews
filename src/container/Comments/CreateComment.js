
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './CreateComment.module.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Comments from './Comments';
import { submitComment, getComments } from '../../redux/actions/commentsActions';
import Button from '../../components/Button/Button';

const CreateComment = ({ submitComment, getComments, postId, user, comments }) => {
    const [comment, setComment] = useState('');
    const [selectedTab, setSelectedTab] = useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    useEffect(() => {
        if(postId){
            getComments(postId);
        }
    }, [getComments, postId])

    const createComment = async (e) => {
        e.preventDefault();
        if (comment) {
            await submitComment({
                user_id: user._id,
                post_id: postId,
                text: comment
            });
        }
        setComment('');
    }

    console.log(comments)

    return (
        <div>
            <div className={classes.postCommentWrapper}>
                <div className={classes.editor}>
                    <ReactMde
                        value={comment}
                        onChange={setComment}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                        }
                        minEditorHeight={100}
                        minPreviewHeight={100}
                    />
                </div>
                <div className={classes.btnWrapper}>
                    <Button
                        type={'submit'}
                        onClick={createComment}>
                        SUBMIT
                    </Button>
                </div>
            </div>
            <Comments user={user} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.login.user.user,
    comments: state.comments.comments
});

const mapDispatchToProps = {
    submitComment,
    getComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
