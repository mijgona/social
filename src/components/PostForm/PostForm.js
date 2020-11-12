import React, { useState } from 'react'

export default function PostForm({onSave}) {
    const [post, setPost] = useState ({
        id: Date.now(),//генерируем ИД из даты
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
        created: Date.now(),
      })

    const tagsChange = (tag, type) => {  
        if (tag!==null){            
            if (type==='submit'){            
            for (let i = 0; i < tag.length; i++) {
                if (tag[i]===""){
                    tag.splice(i,2);
                    continue;
                };
            }           
            }
            for (let i = 0; i < tag.length-1; i++) {
                if (tag[i]===""){
                    tag.splice(i,1);
                    continue;
                };
            }
                          
            if (tag[0]===""){
                tag=null
            }
        }
        setPost((prevState)=> ({...prevState, tags : tag}));
    }
    const handleSubmit=(ev)=>{
        ev.preventDefault();
        if (!post.photo.url){
            post.photo=null;
        }
        tagsChange(post.tags, 'submit');
        onSave(post);
    };



    const handleChange = (ev)=>{
        let {name, value}=ev.target;
        if(name==='tags'){            
            value=value.replace(/#/g,'');                        
            value=value.replace(/\s+/g,' ');
            let parsed = value.split(' ');
            tagsChange(parsed);
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
        if (name===""){
        setPost((prevState)=> ({...prevState, content : value}))}
    };

    return (
        <form onSubmit={handleSubmit}>
             <textarea value={post.content} onChange={handleChange}></textarea>
             <input name="tags" placeholder="tags" value={post.tags?.join(' ')} onChange={handleChange}></input>
             <input name="photo" placeholder="photo" onChange={handleChange}></input>
             <input name="alt" placeholder="alt" onChange={handleChange}></input>
             <button>Ok</button>
        </form>
    )
}