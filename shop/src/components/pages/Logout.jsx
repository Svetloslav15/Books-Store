import React, {Component, Fragment} from "react";
import { Redirect } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Logout extends Component{
    constructor(props){
        super(props);

        this.state = {
            isRedirected: false
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(x => x.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                this.setState({
                    isRedirected: true
                });
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            })
    }
    render(){
        if (this.state.isRedirected){
            return  <Redirect to="/"/>;
        }
        return (<Fragment></Fragment>)
    }
}
export default Logout;