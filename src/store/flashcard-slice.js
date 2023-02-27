import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
    name: "flashcard",
    initialState:{
        items: [],
        totalAmount: 0
    },
    reducers:
    {
        addFlashcard(state, action)
        {
            const addedItem = action.payload

            const exisitingFolder = state.items.find(item => item.folderName === addedItem.newFolderName)
            if(!exisitingFolder)
            {
                state.items.push({folderName: addedItem.newFolderName, folderContent: [{title: addedItem.title, content: addedItem.content}]})
                state.totalAmount++;
            }
            else
            {
                exisitingFolder.folderContent.push({title: addedItem.title, content: addedItem.content})
                state.totalAmount++;
            }
        }
    }
})


export const flashcardActions = flashcardSlice.actions

export default flashcardSlice