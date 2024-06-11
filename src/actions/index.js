'use server'

import connectToDB from "@/database"
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// Actual Practice

// add a user action
export async function addNewUserAction(formData, pathToRevalidate) {
    await connectToDB();
    try {
        // validate using joi / other packages also you can use
        const newlyCreatedUser = await User.create(formData)
        if (newlyCreatedUser) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User added successfully'
            }
        }
        else {
            return {
                success: false,
                message: 'Some error occured! Please try again'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}

// fetch user actions
export async function fetchUsersAction() {
    await connectToDB()

    try {

        const listOfUsers = await User.find({})
        if (listOfUsers) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(listOfUsers))
            }
        }
        else {
            return {
                success: false,
                message: 'Some error occured! Please try again'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}

// edit a user action
export async function editUserAction(currentUserID, formData, pathToRevalidate){
    await connectToDB()

    try {
        
        const {firstName, lastName, email, address} = formData

        const updatedUser = await User.findOneAndUpdate({
            _id: currentUserID
        }, {firstName, lastName, email, address}, {new: true}) // this will automatically update the fields inside ' {firstName, .., address} ' 

        if(updatedUser){
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User updated successfully'
            }
        }
        else{
            return {
                success: false,
                message: 'Not able to update the user! Please try again'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Not able to perform delete operation! Please try again later'
        }
    }

}

// delete a user action
export async function deleteUserAction(currentUserID, pathToRevalidate){
    await connectToDB()
    try {
        const deletedUser = await User.findByIdAndDelete(currentUserID)

        if(deletedUser){
            revalidatePath(pathToRevalidate)
            return{
                success: true,
                message: 'User deleted successfully'
            }
        }
        else{
            return {
                success: false,
                message: 'Not able to perform delete operation! Please try again later'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}



// to convert into server action page
// for theory, practiced below
export async function fetchListOfProducts(){
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()

    return data?.products
}
