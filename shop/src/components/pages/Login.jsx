import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

export default class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            isRedirected: false
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = this.state;
        fetch('http://localhost:5000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        }).then((x) => x.json())
            .then((data) => {

                if (!data.success){
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000
                    });
                    return;
                }
                localStorage.setItem('username', data.username);
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("roles", data.roles);
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
                this.setState({
                    isRedirected: true
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        if (this.state.isRedirected){
            return <Redirect to="/"/>;
        }
        return (
            <main>
                <section class="jumbotron text-dark text-center m-4">
                    <h2 class="ml-5">Login</h2>
                    <form onSubmit={this.handleSubmit} class="ml-5 text-center" method="post" action="#/login">
                        <div class="form-group col-md-4 m-md-auto demo">
                            <label for="exampleInputUsername">Username:</label>
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-user text-white"></i></div>
                                <input onChange={this.handleChange} type="text" class="form-control" name="username" id="exampleInputUsername"
                                       placeholder="Username"/>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3" for="exampleInputPassword1">Password:</label>
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-lock text-white"></i></div>
                                <input onChange={this.handleChange} type="password" class="form-control" name="password" id="exampleInputPassword1"
                                       placeholder="Password"/>
                            </div>
                        </div>
                        <div class="d-block m-auto">
                            <button type="submit" class="btn btn-outline-info p-md-3 mt-5 text-uppercase h5">Submit
                            </button>
                        </div>
                    </form>
                </section>
            </main>

        )
    }
}