import React, { useState, useRef, useEffect } from 'react'

const empty={
    id: 0,//генерируем ИД из даты
    author: {
      avatar:'https://lms.openjs.io/logo_js.svg',
      name: 'OpenJS',
    },
    content: '',
    photo: {
        alt: '',
        url:'',
    },
    hit: false,
    likes: 0,
    likedByMe: false,
    hidden: true,
    tags: null,
    created: 0,
};

export default function PostForm({edited=empty, onSave, onCancel}) {
   const [post, setPost] = useState(edited);
   const firstFocusEl=useRef(null);//начальное значение

    useEffect(() => {
        setPost(edited);
    }, [edited])
    const handleSubmit=(ev)=>{
        ev.preventDefault();
        const parsed=post.tags?.map(o=>o.replace('#','')).filter(o=>o.trim()!=='')||[];
        const tags=parsed.length!==0?parsed :null;
        onSave({
            ...post, 
            id: post.id||Date.now(), 
            created: post.created|| Date.now(), 
            tags, 
            photo: post.photo?.url ? {alt: '', ...post.photo}: null
        });
        setPost(empty);
        firstFocusEl.current.focus();
    };

    const handleChange = (ev)=>{
        let {name, value}=ev.target;
        if (name==='tags'){
            const parsed =value.split(' ');
            setPost((prevState)=>({...prevState, [name]: parsed}));
            return;
        }
        if (name==='alt') {
            var url=""
            post.photo.url ? url=post.photo.url:url=""           
            post.photo={ 
                url: url,
                alt: value,
            };
            setPost((prevState)=> ({...prevState, photo : post.photo}))
        };
        if (name==="photo"){
            var alt="";
            post.photo.alt?alt=post.photo.alt:alt=""           
            post.photo={ 
                url: value,
                alt: alt,
            };
            setPost((prevState)=> ({...prevState, photo : post.photo}))
        }
        if (name==="content"){
            setPost((prevState)=> ({...prevState, content : value}))
        }
    };
    
    const handleCancel =(evt)=>{        
        setPost(empty);
        firstFocusEl.current.focus();
        onCancel();
    }

    return (
        <form>
             <textarea 
                ref={firstFocusEl} 
                name='content' 
                value={post.content || ''} 
                onChange={handleChange}
             />
             <input name="tags" 
                placeholder="tags" 
                value={post.tags?.join(' ') || ''} 
                onChange={handleChange}
             />
             <input 
                name="photo" 
                placeholder="photo" 
                value={(post.photo&&post.photo.url)||''}
                onChange={handleChange}
             />
             <input 
                name="alt" 
                value={(post.photo&&post.photo.alt)||''}
                placeholder="alt" 
                onChange={handleChange}
             />
             <button onClick={handleSubmit}>Ok</button>
             {edited!==empty && <button onClick={handleCancel}>Отменить</button>}
        </form>
    )
}