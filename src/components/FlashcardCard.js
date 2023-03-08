import React from 'react'
import classes from "./FlashcardCard.module.scss"

const FlashcardCard = (props) => {

    const currentFlashcard = props.currentFlashcard

  return (
    <>
    <div className={classes.flashCardCard}>
            <div className={classes.flashCardInner}>
                <div className={classes.flashCardFront}>
                    <p>{currentFlashcard && currentFlashcard.title}</p>
                </div>
                <div className={classes.flashCardBack}>
                    <p className={classes.titleBack}>{currentFlashcard && currentFlashcard.title}</p>
                    <p className={classes.contentBack}>{currentFlashcard && currentFlashcard.content}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default FlashcardCard