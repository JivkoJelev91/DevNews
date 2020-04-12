
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './CreateComment.module.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Comments from './Comments';
import { submitComment } from '../../redux/actions/commentsActions';

const CreateComment = ({ submitComment, postId, user }) => {
    const [comment, setComment] = useState('');
    const [selectedTab, setSelectedTab] = useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const createComment = async () => {
        if (comment) {
            await submitComment({
                user_id: user._id,
                post_id: postId,
                text: comment
            });
        }
        setComment('');
    }

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
                    <button
                        className={classes.commentBtn}
                        type='button'
                        onClick={createComment}>
                        SUBMIT
                    </button>
                </div>
            </div>
            <Comments user={user} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.login.user.user,
});

const mapDispatchToProps = {
    submitComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
