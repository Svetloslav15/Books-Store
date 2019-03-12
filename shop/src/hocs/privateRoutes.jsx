import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function isAdmin(Component) {
    let roles = localStorage.getItem('roles');
    if (!roles){
        toast.warn('You need to be an Admin to access this route!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
        return <Redirect to="/" />
    }
    if (roles.includes('Admin')){
        return <Component/>
    }
    toast.warn('You must be an Admin to access this route!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    });
    return <Redirect to="/" />
}
function isAuthed(Component) {
    if (localStorage.getItem('token')){
        return <Component/>;
    }
    toast.warn('You must be authenticated to access this route!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    });
    return <Redirect to="/login"/>
}
function isNotAuthed(Component) {
    if (!localStorage.getItem('token')){
        return <Component/>;
    }
    toast.warn('You must be not authenticated to access this route!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    });
    return <Redirect to="/"/>
}
export default {
    isAdmin, isAuthed, isNotAuthed
}
