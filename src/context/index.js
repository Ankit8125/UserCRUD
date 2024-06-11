'use client'

import { addNewUserFormInitialState } from "@/utils";
import { createContext, useState } from "react";

export const UserContext = createContext(null)

export default function UserState({children}){ // gets 'children' by default
    const [currentEditedID, setCurrentEditedID] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [addNewUserFormData, setAddNewUserFormData] = useState(addNewUserFormInitialState)

    return (// giving values in an object manner and also giving it access of currentEditedID and set.. , so that it change when needed
        <UserContext.Provider value={{currentEditedID, setCurrentEditedID, openPopup, setOpenPopup, addNewUserFormData, setAddNewUserFormData}}> 
            {children}
        </UserContext.Provider>
    )
}