import React, {Component, Fragment} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Logout from "./components/pages/Logout";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {protectedRoute, isNotAuthed, isAuthed, isAdmin, authedRoute} from './hocs/privateRoutes';
import CreateWatchPage from "./components/pages/CreateWatchPage";
import EditWatch from "./components/pages/EditWatch";
import DetailsPage from "./components/pages/DetailsPage";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import Favourites from "./components/common/Favourites";
import MyOrders from "./components/pages/MyOrders";
import OrderDetails from "./components/pages/OrderDetails";
import PendingOrders from "./components/pages/PendingOrders";
import ArchivedOrders from "./components/pages/ArchivedOrders";
import Users from "./components/pages/Users";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        let AdminRoute = protectedRoute(['Admin'], isAdmin);
        let AuthedRoute = authedRoute(['Admin'], isAuthed);
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
                    <Route exact path="/orders/mine" component={AuthedRoute(MyOrders)}/>
                    <Route exact path="/administration/users/all" component={AdminRoute(Users)}/>
                    <Route exact path="/administration/orders/pending" component={AdminRoute(PendingOrders)}/>
                    <Route exact path="/administration/orders/archived" component={AdminRoute(ArchivedOrders)}/>
                    <Route exact path="/orders/details/:id" component={AuthedRoute(OrderDetails)}/>
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
