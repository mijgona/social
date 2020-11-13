import React, {useRef, useContext } from 'react'
import {    editSubmit,
            editChange,
            editCancel
            } from '../../store/actions';
import PostsContext from '../../contexts/PostsContext';


export default function PostForm() {
   const {state: {edited}, dispatch} = useContext(PostsContext);
   const firstFocusEl=useRef(null);//начальное значение

 
  // useEffect(() => {
   //     setPost(post);
    //}, [post]);
    
    const handleSubmit=(ev)=>{
        ev.preventDefault();
        dispatch(editSubmit());
        //submit();
        firstFocusEl.current.focus();
    };
    const handleChange = (ev)=>{
        const {name, value}=ev.target;
        dispatch(editChange(name, value))
        //dispatch ({type:'POST_EDIT_CHANGE', payload: {name, value}});
        //change({name,value});
    };
    
    const handleReset =(evt)=>{
        firstFocusEl.current.focus();
        dispatch(editCancel())
        //cancel();
    };

    return (
        <form>
             <textarea 
                ref={firstFocusEl} 
                name='content' 
                value={edited.content || ''} 
                onChange={handleChange}
             />
             <input name="tags" 
                placeholder="tags" 
                value={edited.tags?.join(' ') || ''} 
                onChange={handleChange}
             />
             <input 
                name="photo" 
                placeholder="photo" 
                value={(edited.photo&&edited.photo.url)||''}
                onChange={handleChange}
             />
             <input 
                name="alt" 
                value={(edited.photo&&edited.photo.alt)||''}
                placeholder="alt" 
                onChange={handleChange}
             />
             <button onClick={handleSubmit}>Ok</button>
             {edited?.id!==0 && <button onClick={handleReset}>Отменить</button>}
        </form>
    )
}