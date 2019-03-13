import React, {Component, Fragment} from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Logout from "./components/pages/Logout";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {protectedRoute, isNotAuthed, isAuthed, isAdmin} from './hocs/privateRoutes';
import CreateWatchPage from "./components/pages/CreateWatchPage";
import EditWatch from "./components/pages/EditWatch";
import DetailsPage from "./components/pages/DetailsPage";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import Favourites from "./components/common/Favourites";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        let AdminRoute = protectedRoute(['Admin'], isAdmin);
        let AuthedRoute = protectedRoute(['Admin'], isAuthed);
        let NotAuthedRoute = protectedRoute(['Admin'], isNotAuthed);

        return (
            <Fragment>
                <Route path="/" component={Navigation}/>
                <Switch>
                    <Route exact path="/register" component={NotAuthedRoute(Register)}/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={NotAuthedRoute(Login)}/>
                    <Route exact path="/logout" component={AuthedRoute(Logout)}/>
                    <Route exact path="/watches/details/:id" component={AuthedRoute(DetailsPage)}/>
                    <Route exact path="/watches/edit/:id" component={AdminRoute(EditWatch)}/>
                    <Route exact path="/cart" component={AuthedRoute(Cart)}/>
                    <Route exact path="/favourites" component={AuthedRoute(Favourites)}/>
                    <Route exact path="/shop" component={Shop}/>

                    <Route exact path="/administration/watch/add" component={AdminRoute(CreateWatchPage)}/>
                </Switch>

                <ToastContainer hideProgressBar='true' pauseOnHover="false"/>
                <Route path="/" component={Footer}/>

            </Fragment>
        );
    }
}

export default App;
