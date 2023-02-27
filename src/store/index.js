import { configureStore } from "@reduxjs/toolkit";
import flashcardSlice from "./flashcard-slice";

const store = configureStore({
    reducer: {
        flashcard: flashcardSlice.reducer,
    }
})

export default store