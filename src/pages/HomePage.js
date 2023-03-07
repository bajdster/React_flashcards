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
    const [filteredFlashCardItems, setFilteredFlashcardItems] = useState([])
    const [currentFlashcard,setCurrentFlashcard] = useState()
    let flashItemsArr = [];
    const [folderFilter, setFolderFilter] = useState("All")
    const [typeFilter, setTypeFilter] = useState("All")

    useEffect(()=>
    {
        const getFlashcard = async () =>
        {
            const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards.json")
            
            const data = await response.json()
            console.log(data)

            for(let keys in data)
            {
                flashItemsArr.push({title: data[keys].title, content: data[keys].content, folder: data[keys].folder, id: data[keys].id, name: keys, actionType: data[keys].actionType})

                if(currentItems.length <=0)
                {
                    dispatch(flashcardActions.addFlashcard({title:data[keys].title, content: data[keys].content, newFolderName: data[keys].folder, id: data[keys].id}))
                }
            }

            setFlashcardItems(flashItemsArr)
            setFilteredFlashcardItems(flashItemsArr)

        }
        getFlashcard()

    }, [])

    //initial show the random flashcard from all, works when items are loaded
    useEffect(()=>
    {
        console.log(flashcardItems)
        drawFlashcard(filteredFlashCardItems)
    }, [filteredFlashCardItems, flashcardItems])

    useEffect(()=>
    {
        filterFolderHandler();
    },[folderFilter, typeFilter])

    const drawFlashcard = (filteredItems) =>
    {
        const range = filteredItems.length
        const randomNum = Math.floor(Math.random()* range)
        const randomFlashcard = filteredItems[randomNum]
        console.log(range)
        setCurrentFlashcard(randomFlashcard)
    }

    const checkHandler = async (actionType)=>
    {
        const tempItemsArr = [...flashcardItems]
        let searchedItem = tempItemsArr.find(item=> item.id === currentFlashcard.id)

        searchedItem.actionType = actionType

        const response = await fetch("https://flashcard-6f9f6-default-rtdb.firebaseio.com/flashcards/"+searchedItem.name+".json",
        {
            method: "PATCH",
            body: JSON.stringify({actionType: searchedItem.actionType})
        })

        const data = await response.json()

        console.log(data)

        setFlashcardItems(tempItemsArr)
        //Patch method ???
        //I think its success!
    }

    const filterFolderHandler = () =>
    {
        let filteredItems;
        if(folderFilter === "All")
        {
            filteredItems = flashcardItems
        }
        else 
        {
            filteredItems = flashcardItems.filter((item, index) =>
                {
                    if(item.folder === folderFilter)
                    {
                        return item
                    }
                })
        }

        if(typeFilter === "All")
        {
           filteredItems = filteredItems
        }
        else 
        {
            ///!!! - tyoeFilter great letter actionType small letter :)
            filteredItems = filteredItems.filter(item=>
                {
                    if(item.actionType === typeFilter.toLowerCase())
                    {
                        return item
                    }
                })
        }

        console.log(filteredItems)

        setFilteredFlashcardItems(filteredItems)
    }

    const setFolderHandler = (e) =>
    {
        setFolderFilter(e.target.value)
    }
    const setTypeHandler = (e) =>
    {
        setTypeFilter(e.target.value)
    }

    return (
    <div className={classes.homePagePage}>
        <div className={classes.mainPageFilter}>
            <select onChange={setFolderHandler}>
                <option>All</option>
                {currentItems.map(item=>
                            {
                                return <option>{item.folderName}</option>
                            })}
            </select>
            <select onChange={setTypeHandler}>
                <option>All</option>
                <option>Learned</option>
                <option>Repeat</option>
                <option>Wrong</option>
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
            <div className={classes.flashCardInner}>
                <div className={classes.flashCardFront}>
                    <p>{currentFlashcard && currentFlashcard.title}</p>
                </div>
                <div className={classes.flashCardBack}>
                    <p>{currentFlashcard && currentFlashcard.content}</p>
                </div>
            </div>
        </div>

        <div className={classes.actionButtons}>
            <div className={classes.actionButton} onClick={()=>
            {
                checkHandler("learned")
            }}>
                <img src={correct} alt="correct icon"></img>
            </div>
            <div className={classes.actionButton} onClick={()=>
            {
                checkHandler("repeat")
            }}>
                <img src={refresh} alt="refresh icon"></img>
            </div>
            <div className={classes.actionButton} onClick={()=>
            {
                checkHandler("wrong")
            }}>
                <img src={wrong} alt="wrong icon"></img>
            </div>
        </div>
    </div>
  )
}

export default HomePage
