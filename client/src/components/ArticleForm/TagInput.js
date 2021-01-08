import React, { useState, useEffect } from 'react';
import "./TagInput.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const TagInput = (props) => {

    // let [tags, setTags] = useState([]);
    let [tagInput, setTagInput] = useState("")

    //add tag
    const handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            console.log('enter press here!');
            props.setArticleData(prevArticleData => ({
                ...prevArticleData, 
                tags: [...prevArticleData.tags, tagInput] }) 
            )
            setTagInput("");
        }
    }

    //delete tag
    const deleteTag = (tag) => {
        let newTags = props.articleData.tags.filter(item => item !== tag);

        props.setArticleData( prevArticleData => ({ ...prevArticleData,  tags: newTags }) )
    }

    
    const tagItems = props.articleData.tags.map((tag) => {
        return (
            <div onClick={() => deleteTag(tag)} className="article-tag" key={tag.toString()}>
                <div  className="delete-tag">
                    <FontAwesomeIcon icon={faTimes}  size="1x"  color="white" />
                </div>
                
                {tag}
            </div>
        )
    })

    const tagStyle = {
        display: "flex",
        flexDirection: "row"
    }

    return (
        <div id="tag-style">
            <div className="chosen-tags">          
                { tagItems }   
            </div>
            <input 
                type="text" 
                placeholder="Tag your article"
                value={tagInput} 
                onChange={e => setTagInput(e.target.value)} 
                onKeyPress={handleKeyPress} 
            />
        </div>
    )
    
}

export default TagInput