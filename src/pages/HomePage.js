import React from 'react'
import { useSelector } from 'react-redux'
import classes from "./HomePage.module.scss"

const HomePage = () => {
  
    const flashItems = useSelector(state=>state.flashcard.items)
  
    return (
    <div className={classes.mainPage}>HomePage
        <ul>
            {flashItems.map(item =>
            {
                return (<li>{item.folderName}
                {item.folderContent.map(folderItem =>
                {
                    return <p>{folderItem.title}</p>
                })}

                </li>)
            })}
        </ul>
    </div>
  )
}

export default HomePage
