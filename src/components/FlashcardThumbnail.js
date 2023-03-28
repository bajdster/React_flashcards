import React, {useState} from 'react';
import classes from "./FlashcardThumbnail.module.scss";
import readMore from "../images/rm.png";
import deleteIcon from "../images/delete.png";
import edit from "../images/edit.png";
import { useDispatch } from 'react-redux';
import { flashcardActions } from '../store/flashcard-slice';

const FlashcardThumbnail = (props) => 
{
    const [isTNOpen, setIsTNOpen] = useState(false)
    const dispatch = useDispatch();

    const openThumbnailHandler = () =>
    {
        setIsTNOpen((prevState)=>
        {
            return !prevState;
        })
    }

    const deleteFlashcard = async ()=>
    {
        const toDeleteItem = props.name;

        const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards/"+toDeleteItem+".json",
        {
            method: "DELETE",
        })

        dispatch(flashcardActions.removeFlashcard({id: props.id, folder: props.folder}))
    }

    const editFlashcard = () =>
    {
        props.editWindowHandler(props.id, props.name, props.title, props.content, props.folder);
    }

    const longTitle = props.title;
    let shortTitle = longTitle.slice(0,15) + "...";


    return (
    <>
        <li className={classes.thumbnailItem} id={props.id} onClick={openThumbnailHandler}>
            {isTNOpen ? longTitle : shortTitle}
            {!isTNOpen && <div className={classes.readMoreContainer}><img src={readMore} alt="Read more icon"></img></div>}
            {isTNOpen && <div className={classes.deleteButton} onClick={deleteFlashcard}>
                <img src={deleteIcon} alt="delete icon"></img>
            </div>}
            {isTNOpen && <div className={classes.editButton} onClick={editFlashcard}>
                <img src={edit} alt="edit icon"></img>
            </div>}
        </li>
    </>)
}

export default FlashcardThumbnail