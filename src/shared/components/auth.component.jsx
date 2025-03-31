
import React from 'react'
import Login from '../../pages/login.page';
import userService from '../services/user.service';

function IsAuth({children}) {
    const authPermission = userService.isAuthenticated();
    return (
        authPermission?
        <>
            {children}
        </>:
        <Login/>
    )
}

export default IsAuth