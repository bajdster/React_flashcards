import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import classes from "./MainMenu.module.scss"
import fc from "../images/fc.png"

const MainMenu = () => {
  return (
    <nav className={classes.navBar}>
        <div className={classes.logo}>
        <Link to="/">
            <img src={fc} alt="flashcard logo"></img>
            Flash<span>Memo</span>
        </Link>
        </div>
        <div className={classes.menu}>
            <ul>
                <li><NavLink to = "/" className={({isActive})=> isActive? classes.active : undefined}>Learn</NavLink></li>
                <li><NavLink to="/add" className={({isActive})=> isActive? classes.active : undefined}>Add Flashcard</NavLink></li>
            </ul>
        </div>
    </nav>
  )
}

export default MainMenu