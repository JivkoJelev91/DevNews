
import React, { useRef } from 'react';
import Tags from '../Tags/Tags';
import UserDetails from '../UserDetails/UserDetails';
import Posts from '../Posts/AllPosts/Posts';
import Reviews from '../Reviews/Reviews';
import Filters from '../Filters/Filters';
import classes from './Layout.module.css';

const Layout = () => {
    const page = useRef(0);
    const pageSize = 10;
    console.log(page)
    return (
        <div>
            <div className={classes.layout}>
                <div className={classes.profileAndTags}>
                    <div></div>
                    <UserDetails />
                    <Tags />
                </div>
                <div className={classes.postsWrapper}>
                     <div className={classes.filtersWrapper}>
                        <Filters />
                    </div>
                    <Posts 
                    page={page}
                    pageSize={pageSize}/>
                </div>
                <div className={classes.reviewWrapper}>
                <div className={classes.lastCommentsWrapper}>LAST COMMENTS</div>
                    <Reviews />
                </div>
            </div>
        </div>
    );
}

export default Layout