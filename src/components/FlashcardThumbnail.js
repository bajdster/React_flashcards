import React, {useState} from 'react'
import classes from "./FlashcardThumbnail.module.scss"
import readMore from "../images/rm.png"

const FlashcardThumbnail = (props) => 
{
    const [isTNOpen, setIsTNOpen] = useState(false)

    const openThumbnailHandler = () =>
    {
        setIsTNOpen((prevState)=>
        {
            return !prevState;
        })
    }

    const longTitle = props.title;
    let shortTitle = longTitle.slice(0,15) + "...";


    return (<li className={classes.thumbnailItem} id={props.key} onClick={openThumbnailHandler}>
        {isTNOpen ? longTitle : shortTitle}
        {!isTNOpen && <div className={classes.readMoreContainer}><img src={readMore} alt="Read more icon"></img></div>}
    </li>)
}

export default FlashcardThumbnail