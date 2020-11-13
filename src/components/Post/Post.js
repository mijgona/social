import React, { useContext } from 'react'; 

import './Post.css';
import Tags from '../Tags/Tags';
import PostsContext from '../../contexts/PostsContext';
import {edit, hide,show,like,remove} from '../../store/actions';



function Post({post}) {
    const {author}=post;
    const {photo}=post;
    const {tags}=post;

    const {dispatch }=useContext(PostsContext);

    const handleLike = ()=>{
        dispatch(like(post.id));
    };

    const handlePostRemove =(evt)=>{        
        dispatch(remove(post.id));
        //remove(post.id);
    }

    const handlePostShow =(evt)=>{        
        dispatch(show(post.id));
    }    
    const handlePostHide =(evt)=>{        
        dispatch(hide(post.id));
    }  
    const handlePostEdit =(evt)=>{        
        dispatch(edit(post.id));
    }

    if (!post.hidden){
    return (
        <article>
            <header>
                <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                <h5>{author.name}</h5>
                <button onClick={handlePostRemove}>удалить</button>
                <button onClick={handlePostHide}>скрыть</button>
                <button onClick={handlePostEdit}>изменить</button>
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
    )}
    return (
        <article>
            <header>
                <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                <h5>{author.name}</h5>
                <button onClick={handlePostShow}>показать</button>
            </header>
        </article>
    )

}

export default Post
