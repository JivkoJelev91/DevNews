
import React, { useMemo } from 'react';
import classes from './Tags.module.css';

const Tags = () => {
    const tags = useMemo(() => ['JavaScript', 'React.js', 'Vue.js', 'Node.js', 'Tutorial', 'Linux'],[])

    return (
        <div>
            <div className={classes.title}>TAGS</div>
            {tags.map(tag => (
                <div className={classes.tag} key={tag}>
                    <i className="fa fa-hashtag"/>
                    {tag}
                </div>))}
        </div>
    );
}

export default Tags;
