import React, {useState, useEffect} from 'react'
import classes from "./Statistics.module.scss"
import positive from "../images/positive.png"
import negative from "../images/negative.png"
import neutral from "../images/neutral.png"

//maybe its the time to work with RWD of elements
const Statistics = (props) => {

    const items = props.flashcardItems;
    
     const [learned, setLearned] = useState(0);
     const [repeat, setRepeat] = useState(0);
     const [wrong, setWrong] = useState(0);

    useEffect(()=>
    {
        let correct = 0;
        let refresh = 0;
        let incorrect = 0;
        for(let item of items)
        {
            if(item.actionType === "learned")
            {
                correct++;
            }
            else if(item.actionType === "repeat")
            {
                refresh++;
            }
            else if(item.actionType === "wrong")
            {
                incorrect++;
            }
        }
    
        setLearned(correct);
        setRepeat(refresh);
        setWrong(incorrect);
    }, [items])

    

  return (
    <div className={classes.StatisticsWindow}>
        <div className={classes.window}>
            <div className={classes.image}>
                <img src={positive}></img>
            </div>
            <h2>{learned}</h2>
        </div>
        <div className={classes.window}>
            <div className={classes.image}>
                <img src={neutral}></img>
            </div>
            <h2>{repeat}</h2>
        </div>
        <div className={classes.window}>
            <div className={classes.image}>
                <img src={negative}></img>
            </div>
            <h2>{wrong}</h2>
        </div>
    </div>
  )
}

export default Statistics