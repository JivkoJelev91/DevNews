
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { baseStaticUrl } from '../../../Config/Config';
import { getPosts } from '../../../redux/actions/postsActions';
import { debounce } from '../../../helpers/helper';

import classes from './Posts.module.css';
import Spiner from '../../../components/Spinner/Spinner';
import moment from 'moment';

const Posts = ({ getPosts, posts, loading, page, pageSize }) => {
    const history = useHistory();

    console.log(page);
    console.log(posts)


    const onScroll = useCallback((e) => {
        e.preventDefault();
        const nearBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (nearBottom) {
            page.current++;
            return getPosts(page.current, pageSize)
        }
    }, [getPosts, page, pageSize]);

    useEffect(() => {
        window.addEventListener('scroll', debounce(onScroll, 200), false);
        return () => window.removeEventListener('scroll', onScroll, false);
    }, [onScroll])

    useEffect(() => {
        getPosts(page.current, pageSize);
    }, [getPosts, pageSize, page]);

    const openPost = (id) => {
        history.push(`/current-post?postId=${id}`);
    }

    return (
        <div>
            {loading && <Spiner />}
            {posts && posts.length > 0 && posts.map((post) => (
                <div className={classes.posts} key={post._id} onClick={() => openPost(post._id)}>
                    <div className={classes.postImage} >
                        <img src={`${baseStaticUrl}/${post.cover_image.name}`} alt='postImage' />
                    </div>
                    <div>
                        <div className={classes.tag}>#JavaScript</div>
                        <div className={classes.title}>
                            {post.title}
                        </div>
                        <div className={classes.userDetails}>
                            <div className={classes.avatar}
                                style={{ backgroundImage: `url(${post.user.default_picture})` }}>
                            </div>
                            <div className={classes.username}>{post.user.name}</div>
                            <div className={classes.publishDate}>
                                {moment().to(post.created)}
                            </div>
                            <div className={classes.likes}>
                                <i className='fa fa-thumbs-up' /> 29
                            </div>
                            <div className={classes.messages}>
                                <i className="fa fa-comment" /> 3
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = state => ({
    loading: state.posts.loading,
    posts: state.posts.posts,
    totalPages: state.posts.total_pages,
})

const mapDispatchToProps = {
    getPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
