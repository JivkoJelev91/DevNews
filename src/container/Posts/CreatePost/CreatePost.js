import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    createDraftPost,
    createCoverImage,
    getDraftPost,
    editDraftPost,
} from '../../../redux/actions/postsActions';
import { withRouter } from "react-router-dom";

import Notifications from 'react-notification-system-redux';
import store from '../../../redux/store';
import classes from './CreatePost.module.css'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const CreatePost = ({
    createDraftPost,
    createCoverImage,
    getDraftPost,
    draftPost,
    editDraftPost,
    history
}) => {
    const [bodyText, setBodyText] = useState("***[# Markdown guide](https://guides.github.com/features/mastering-markdown/)***");
    const [selectedTab, setSelectedTab] = useState("write");
    const [title, setTitle] = useState('');
    const [coverImg, setCoverImg] = useState(null);
    const postId = new URLSearchParams(window.location.search).get('postId')

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    useEffect(() => {
        getDraftPost(postId)
    }, [postId, getDraftPost]);

    useEffect(() => {
        if (draftPost && postId) {
            setBodyText(draftPost.body)
            setTitle(draftPost.title)
            setCoverImg({
                img_id: draftPost.cover_image._id,
                img_name: draftPost.cover_image.name
            })
        }
    }, [draftPost, postId])

    const saveDraft = async () => {
        console.log(draftPost)
        if (draftPost && coverImg && title && bodyText) {
            await editDraftPost({
                title: title,
                cover_image: coverImg.img_id,
                body: bodyText,
                post_id: postId,
            }).then(id => {
                history.push(`/draft-post?postId=${id}`)
            })
            await clearPost();
        }
        if (!draftPost && coverImg && title && bodyText) {
            await createDraftPost({
                title: title,
                cover_image: coverImg.img_id,
                body: bodyText,
            }).then(id => {
                history.push(`/draft-post?postId=${id}`)
            })
            await clearPost();
        }
        if (!coverImg || !title || !bodyText) {
            store.dispatch(Notifications.success('Title image is uploaded'))
        }
    }

    const clearPost = () => {
        setTitle('');
        setBodyText('');
        setCoverImg(null);
    }

    const uploadImage = (e) => {
        const formData = new FormData();
        const img = e.target.files[0];
        formData.append('cover_image', img);
        createCoverImage(formData)
            .then((cvrImg) => {
                if (cvrImg && cvrImg.data && cvrImg.data.success) {
                    setCoverImg(cvrImg.data)
                }
            })
    }

    return (
        <div style={{ paddingTop: '50px' }}>
            <div className={classes.createPostWrapper}>
                <div className={classes.titleRow}>
                    <div className={classes.titleWrapper}>
                        <div className={classes.title}>
                            <i className="fa fa-pencil" />
                            <input
                                type='text'
                                name='title'
                                placeholder='Title'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.fileWrapper}>
                        <label htmlFor="imageUpload" className={classes.customFileUpload}>
                            <i className="fa fa-cloud-upload" style={{
                                color: coverImg ? '#4BB543' : '#000'
                            }} /> Title image upload
                    </label>
                        <input
                            id="imageUpload"
                            type="file"
                            onChange={uploadImage}
                            accept="image/*"
                            multiple={false}
                        />
                    </div>
                </div>
                <div className={classes.editor}>
                    <ReactMde
                        value={bodyText}
                        onChange={setBodyText}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                        }
                        minEditorHeight={350}
                        minPreviewHeight={350}
                    />
                </div>
                <div className={classes.btnWrapper}>
                    <button
                        className={classes.publish}
                        type='button'
                        onClick={saveDraft}>
                        SAVE DRAFT
                    </button>
                    <button
                        className={classes.publish}
                        type='button'
                        onClick={clearPost}>
                        CLEAR
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    createDraftPost,
    createCoverImage,
    getDraftPost,
    editDraftPost,
}

const mapStateToProps = state => ({
    draftPost: state.posts.draftPost,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost));