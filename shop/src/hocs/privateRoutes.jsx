import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function protectedRoute(allowedRoles, inRole) {
    return function (WrappedComponent) {
        return function ({role, ...rest}) {
            if (inRole()) {
                return <WrappedComponent {...rest} />;
            }
            toast.warn('You can\'t access this route!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
            return <Redirect to="/"/>
        };

    };

}
function authedRoute(allowedRoles, inRole) {
    return function (WrappedComponent) {
        return function ({role, ...rest}) {
            if (inRole()) {
                return <WrappedComponent {...rest} />;
            }
            toast.warn('You can\'t access this route!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
            return <Redirect to="/login"/>
        };

    };

}
function isAdmin() {
    let roles = localStorage.getItem('roles');
    if (!roles) {
        return false;
    }
    return roles.includes('Admin');

}

function isAuthed(Component) {
    return localStorage.getItem('token');
}

function isNotAuthed(Component) {
    return !localStorage.getItem('token');
}

export {
    isAuthed, isNotAuthed, protectedRoute, isAdmin, authedRoute
}