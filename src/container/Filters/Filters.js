import React from 'react';

const Filters = () => {

    const getNewest = () => {
        console.log('get newest post');
    }

    const getMostLiked = () => {
        console.log('get most liked post');
    }

    return (
        <>
            <button type='button' onClick={getNewest}>NEWEST</button>
            <button type='button' onClick={getMostLiked}>MOST LIKED</button>
        </>
    );
}

export default Filters;
