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
import privateRoutes from './hocs/privateRoutes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }
    render() {
        return (
            <Fragment>
                <Route path="/" component={Navigation}/>
                <Switch>
                    <Route exact path="/register" render={() => privateRoutes.isNotAuthed(Register)}/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={() => privateRoutes.isNotAuthed(Login)}/>
                    <Route exact path="/logout" component={() => privateRoutes.isAuthed(Logout)}/>
                </Switch>

                <ToastContainer hideProgressBar='true' pauseOnHover="false"/>
                <Route path="/" component={Footer}/>

            </Fragment>
        );
    }
}

export default App;
