import React, {useState, useRef, useEffect} from 'react'
import classes from "./AddFlashcard.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { flashcardActions } from '../store/flashcard-slice'

const AddFlashcard = () => {

const [isNewFolder, setIsNewFolder]= useState(false)
const dispatch = useDispatch()
const data = useSelector(state=>state.flashcard.items)
const titleRef = useRef()
const contentRef = useRef()
const newFolderRef = useRef()

//need to check if any folder exists

// useEffect(()=>
// {
//     console.log(data)
// }, [data])

//made it async function which send http
const sendData = () =>
{
    console.log(data)
}


const folderChooseHandler = (e) =>
{
    if(e.target.value==="+New Folder")
    setIsNewFolder(true)
    else setIsNewFolder(false)
}

const addNewFlashcardHandler = (e) =>
{
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const newFolderName = newFolderRef.current.value;

    dispatch(flashcardActions.addFlashcard({title, content, newFolderName}))

    sendData();
}
//wonder if redux is really needed...nevermind
//review info about memo and usecallback

//first get items from server when loaded and put it to store
//then when added it can check if folder exist 
//then useSelector and add whole store to database


//need to change css and throw everything in div positioning absolute and then add form window, flashcard window etc...
  return (
    <div className={classes.addFlashMainWindow}>
        <div className={classes.addCardFormWindow}>
        <h1>Add new flashcard</h1>
            <form onSubmit={addNewFlashcardHandler}>
                <select onChange={folderChooseHandler}>
                    <option>Folder</option>
                    <option>+New Folder</option>
                </select>
                {isNewFolder ? <input type="text" placeholder='Folder Name' ref={newFolderRef}></input>: null}
                <input type="text" placeholder='Title' ref={titleRef}></input>
                <textarea placeholder='Flashcard content' ref={contentRef}></textarea>
                <button>Add flashcard</button>
            </form>
        </div>

        <div className={classes.flashcardList}>
                    {data.map(item =>
                    {
                        return (<>
                            <b>{item.folderName}</b>
                            <ul>
                                {item.folderContent.map(folderItem =>
                                {
                                    return <li>{folderItem.title}</li>
                                })}

                            </ul>
                        </>)
                    })}
        </div>
    </div>
  )
}

export default AddFlashcard
