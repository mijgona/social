import React from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

function Wall(props) {

    const posts=useSelector((state)=>state.posts, shallowEqual)
   
    return (
      <>
        <PostForm />
        <div>
            {posts.map(o => <Post key={o.id} post={o} />)}
        </div>      
      </>
    );
}

export default Wall
