import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


//logout from authService is an async function and returns a promise so we can use then, catch functions.
//when logged out so we dispatch the logout so store remains updated.
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
            .catch((error) => {
                console.log("Error logging out", error)
            })

    }
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            Logout
        </button>
    )
}

export default LogoutBtn
