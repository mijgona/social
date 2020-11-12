import React from 'react'; 

import './Post.css';
import Tags from '../Tags/Tags';



function Post({post, onLike, onRemove}) {
    const {author}=post;
    const {photo}=post;
    const {tags}=post;

    const handleLike = (evt)=>{
        onLike(post.id);
    };

    const handlePostRemove =(evt)=>{
        onRemove(post.id);
    }
    return (
        <article>
            <header>
                <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                <h5>{author.name}</h5>
                <button onClick={handlePostRemove}>удалить</button>
                <div>{post.created}</div>
                {post.hit && <span>HIT</span>}
            </header>
            <div>
                <div className='Post-content'>{post.content}</div>
                {photo &&  <img src={photo.url} alt={photo.alt} className='Post-photo' />}
            </div>
            <footer>
                <span className='Post-likes' onClick={handleLike}>
                    <img 
                        src={post.likedByMe ?  'https://lms.openjs.io/liked.svg' : 'https://lms.openjs.io/unliked.svg'}
                        width='20' 
                        height='20' 
                        alt='likes'
                    />
                    <span className='Post-likes-count'>{post.likes}</span>
                    {tags && <Tags key={tags} tags={tags}/>}
                </span> 
            </footer>        
        </article>
    )
}

export default Post
