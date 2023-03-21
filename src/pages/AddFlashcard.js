import React, {useState, useRef, useEffect} from 'react'
import classes from "./AddFlashcard.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { flashcardActions } from '../store/flashcard-slice'
import FlashcardThumbnail from '../components/FlashcardThumbnail'

const AddFlashcard = () => {

const [isNewFolder, setIsNewFolder]= useState(false)
const dispatch = useDispatch()
const data = useSelector(state=>state.flashcard.items)
const titleRef = useRef()
const contentRef = useRef()
const newFolderRef = useRef()
const currentItems = useSelector(state=> state.flashcard.items)




useEffect(()=>
    {    
        const getFlashcard = async () =>
        {
            const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards.json")
            
            const data = await response.json()

            if(!data)
            {
                setIsNewFolder(true)
            }

            for(let keys in data)
            {
                if(currentItems.length <=0)
                {
                    console.log("I'm fetching when added new item")
                    dispatch(flashcardActions.addFlashcard({title:data[keys].title, content: data[keys].content, newFolderName: data[keys].folder, name:keys, id: data[keys].id}))
                }
            }
        }
        getFlashcard()
 
    }, [])

const sendData = async (dataObj) =>
{
    console.log(dataObj)

    try
    {
        
        const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards.json",
        {
            method: "POST",
            body: JSON.stringify({title: dataObj.title, content: dataObj.content, folder: dataObj.newFolderName, id: dataObj.id})
        })
        if(!response.ok)
        {
            throw new Error("Sending data error")
        }

        const resp = await response.json();

        dispatch(flashcardActions.addFlashcard({title:dataObj.title, content: dataObj.content, newFolderName: dataObj.newFolderName, name:resp.name, id: dataObj.id}))


        //try use response to get name ??
        //bingo
    }
    catch(error)
    {
        console.log(error.message)
    }
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
    const id = Math.random()*10000

    if(title && content)
    {
        sendData({title, content, newFolderName, id: id});
    }
}

console.log(data)

  return (
    <div className={classes.addFlashMainWindow}>
        <div className={classes.addCardFormWindow}>
        <h1>Add new flashcard</h1>
            <form onSubmit={addNewFlashcardHandler}>
                <select ref = {newFolderRef} onChange={folderChooseHandler}>
                    {data.map(item=>
                    {
                        return <option>{item.folderName}</option>
                    })}
                    <option>+New Folder</option>
                </select>
                {isNewFolder ? <input type="text" placeholder='Folder Name' ref={newFolderRef}></input>: null}
                <input type="text" placeholder='Title' ref={titleRef}></input>
                <textarea placeholder='Flashcard content' ref={contentRef}></textarea>
                <button>Add flashcard</button>
            </form>
        </div>

        <div className={classes.flashcardList}>
                    <h1>Recently added flashcards</h1>
                    {data.map(item =>
                    {
                        return (<>
                            <b key = {item.id}>{item.folderName}</b>
                            <ul>
                                {item.folderContent.map(folderItem =>
                                {
                                    console.log(folderItem)
                                    return <FlashcardThumbnail key = {folderItem.id} id={folderItem.id} title={folderItem.title} name={folderItem.name} folder={item.folderName}/>
                                })}

                            </ul>
                        </>)
                    })}
        </div>
    </div>
  )
}

export default AddFlashcard
