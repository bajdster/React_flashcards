import { createSlice, current } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
    name: "flashcard",
    initialState:{
        items: []
    },
    reducers:
    {
        addFlashcard(state, action)
        {
            const addedItem = action.payload

            const exisitingFolder = state.items.find(item => item.folderName === addedItem.newFolderName)
            
            if(!exisitingFolder)
            {
                state.items.push({folderName: addedItem.newFolderName, folderContent: [{title: addedItem.title, content: addedItem.content, id: addedItem.id}]})
            }
            else
            {
                exisitingFolder.folderContent.push({title: addedItem.title, content: addedItem.content, id: addedItem.id})
            }
        },

        //not easy loop
        //wtf is proxy?!
        //anoither option is to made another database which holds actiontypes and filter by it
        //using current helps with seeing state

        //is it really neccesary? instead get item in homeage state and there add typeAction, and then change state of slice...
        // triggerAction(state, action)
        // {
        //     const flashcard = action.payload 
        //     console.log(flashcard)
            

        //     const currentState = current(state.items)

        //     const searched = currentState.find(item=>
        //         {
        //             if(item.folderName === flashcard.folder)
        //             return item
        //         })

        //         console.log(searched)

           
        // }

    }
})


export const flashcardActions = flashcardSlice.actions

export default flashcardSlice