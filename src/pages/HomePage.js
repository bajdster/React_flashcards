import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from "./HomePage.module.scss"
import { flashcardActions } from '../store/flashcard-slice'
import correct from "../images/correct.png"
import wrong from "../images/wrong.png"
import refresh from "../images/refresh.png"

const HomePage = () => {

    const dispatch = useDispatch()
    const currentItems = useSelector(state=> state.flashcard.items)
    const [flashcardItems, setFlashcardItems] = useState([])
    const [currentFlashcard,setCurrentFlashcard] = useState()
    let flashItemsArr = [];

    useEffect(()=>
    {
        const getFlashcard = async () =>
        {
            const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards.json")
            
            const data = await response.json()

            for(let keys in data)
            {
                flashItemsArr.push({title: data[keys].title, content: data[keys].content, folder: data[keys].folder, id: data[keys].id})

                if(currentItems.length <=0)
                {
                    dispatch(flashcardActions.addFlashcard({title:data[keys].title, content: data[keys].content, newFolderName: data[keys].folder, id: data[keys].id}))
                }
            }

            setFlashcardItems(flashItemsArr)

        }
        getFlashcard()

    }, [])

    useEffect(()=>
    {
        drawFlashcard()
    }, [flashcardItems])


    //code way to filter items and to control actions on them

    const drawFlashcard = () =>
    {
        console.log("Elo")
        const range = flashcardItems.length
        const randomNum = Math.floor(Math.random()* range)
        const randomFlashcard = flashcardItems[randomNum]
        console.log(range)
        setCurrentFlashcard(randomFlashcard)
    }

    return (
    <div className={classes.homePagePage}>
        <div className={classes.mainPageFilter}>
            <select>
                <option>All</option>
                {currentItems.map(item=>
                            {
                                return <option>{item.folderName}</option>
                            })}
            </select>
            <select>
                <option>All</option>
                <option>Learned</option>
                <option>Repeat</option>
            </select>
            {/* <ul>
                {flashcardItems.map(item =>
                {
                    return (<li>{item.folder}
                    <p>{item.title}</p>
                    <p>{item.content}</p>

                    </li>)
                })}
            </ul> */}
        </div>

        <div className={classes.flashCardCard}>
            <p>{currentFlashcard && currentFlashcard.title}</p>
        </div>

        <div className={classes.actionButtons}>
            <div className={classes.actionButton} onClick={drawFlashcard}>
                <img src={correct} alt="correct icon"></img>
            </div>
            <div className={classes.actionButton}>
                <img src={refresh} alt="refresh icon"></img>
            </div>
            <div className={classes.actionButton}>
                <img src={wrong} alt="wrong icon"></img>
            </div>
        </div>
    </div>
  )
}

export default HomePage
