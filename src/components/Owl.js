import React, { useState } from 'react'
import owl1 from "../images/owl1.png"
import owl2 from "../images/owl2.png"
import classes from "./Owl.module.scss"

const Owl = () => {

    const guides = ["Did you know, that flashcards are one of the best ways to learn?", "Don't give up you can still win", "Practice your memory everyday", "Be sure that you switch off all distractors", "You are doing great!", "I'm counting on you"]

    const owls = ["owl1" , "owl2"]

    const [actualGuide, setActualGuide] = useState()
    const [actualOwl, setActualOwls] = useState("owl1")


    const showGuide = () =>
    {
        const randomGuide = guides[Math.floor(Math.random()* guides.length)]
        setActualGuide(randomGuide);
        const randomOwl = owls[Math.floor(Math.random()*owls.length)]
        setActualOwls(randomOwl)
    }
    

  return (
<div className={classes.owlBox} onMouseOver={showGuide}>
    <div className={classes.cloud}>{actualGuide}</div>
    <img src={actualOwl === "owl1" ? owl1 : owl2} alt="Owl pic"></img>
</div>
  )
}

export default Owl