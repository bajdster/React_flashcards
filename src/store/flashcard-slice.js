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
                state.items.push({folderName: addedItem.newFolderName, folderContent: [{title: addedItem.title, content: addedItem.content, id: addedItem.id, name:addedItem.name}]})
            }
            else
            {
                exisitingFolder.folderContent.push({title: addedItem.title, content: addedItem.content, id: addedItem.id, name:addedItem.name})
            }
        },

        removeFlashcard(state, action)
        {
            const {id, folder} = action.payload
            const actualItems = current(state.items);
            console.log(actualItems)
            const filteredContent = actualItems.map(item =>
                {
                    if(item.folderName === folder)
                    {
                        const filteredArray = item.folderContent.filter(content=>
                            {
                                return content.id !== id
                            })
                        if(filteredArray.length<=0) 
                        {
                            //
                        }
                        return {folderName: item.folderName, folderContent: filteredArray}
                    }
                    else return item;
                })
                
            const searchIsAnyFolderEmpty = filteredContent.filter(item=>
                {
                   if(item.folderContent.length>0)
                   {
                    return item
                   }
                })
            state.items = searchIsAnyFolderEmpty;
        },

        editFlashcard(state, action)
        {
            const {id, name, title, content, folder} = action.payload
            const actualItems = (current(state.items))

            const filteredItems = actualItems.map(item=>
                {
                    if(item.folderName === folder)
                    {
                        const updatedFolderContent = item.folderContent.map(folderItem=>
                            {
                                if(folderItem.id === id)
                                {
                                    return {...folderItem, title:title, content:content}
                                    
                                }
                                else return folderItem
                            })

                            return {...item, folderContent:updatedFolderContent}
                    }

                    else return item
                })

                state.items = filteredItems;
        }

    }
})


export const flashcardActions = flashcardSlice.actions

export default flashcardSlice