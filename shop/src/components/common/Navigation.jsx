import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {isAdmin} from '../../hocs/privateRoutes';

export default class Navigation extends Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="h3">
                        <Link className="navbar-brand h2" to="/">Watch Store</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mt-3">
                            <li className="nav-item mx-5">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-5">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            {
                                localStorage.getItem('token') != undefined ?
                                    (<Fragment>
                                        <li className="nav-item mx-5">
                                            <Link className="nav-link" to="/orders/mine">My Orders</Link>
                                        </li>
                                        {
                                            isAdmin() == true ? (<li className="nav-item dropdown">
                                                <div className="nav-link dropdown-toggle cp" id="navbarDropdown"
                                                      role="button"
                                                      data-toggle="dropdown"
                                                      aria-haspopup="true" aria-expanded="false">
                                                    Administration
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link className="dropdown-item" to="/administration/watch/add">Add
                                                        Watch</Link>
                                                    <Link className="dropdown-item" to="/administration/orders/pending">Pending
                                                        Orders</Link>
                                                    <Link className="dropdown-item" to="/administration/orders/archived">Archived
                                                        Orders</Link>
                                                    <Link className="dropdown-item" to="/administration/users/all">Get All
                                                        Users</Link>
                                                </div>
                                            </li>) : <Fragment></Fragment>
                                        }
                                        <div className="row justify-content-center">
                                            <li className="nav-item ml-5">
                                                <Link to="/favourites" className="nav-link"><i
                                                    className="fas fa-heart font-2em"></i></Link>
                                            </li>
                                            <p className="font-2em">/</p>
                                            <li className="nav-item ml-1">
                                                <Link className="nav-link" to="/cart"><i
                                                    className="fas fa-cart-arrow-down font-2em"></i></Link>
                                            </li>
                                        </div>
                                        <li className="nav-item ml-5 mt-3">
                                            <h5>Welcome, {localStorage.getItem('username')}!</h5>
                                        </li>
                                        <li className="nav-item font-2em ml-2">
                                            <Link className="nav-link" to="/logout"><i class="fas fa-sign-out-alt"></i></Link>
                                        </li>
                                    </Fragment>) :
                                    (
                                        <Fragment>
                                            <li className="nav-item mx-5">
                                                <Link className="nav-link" to="/register">Register</Link>
                                            </li>
                                            <li className="nav-item mx-5">
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>
                                        </Fragment>
                                    )
                            }
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}