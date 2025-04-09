
import React, { useEffect } from 'react'
import Login from '../../pages/login.page';
import userService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

function IsAuth({children}) {
    const navigate = useNavigate();
    const authPermission = userService.isAuthenticated();
    
    useEffect(()=>{
        if(!authPermission) navigate('/login');
    })

    return (
        authPermission?
        <>
            {children}
        </>:
        null
    )
    

}

export default IsAuth