import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }
    componentWillMount = () => {
        this.setState({
            isAdmin: this.props.isAdmin
        })
    }

    makeAdmin = () => {
        fetch('http://localhost:5000/admin/make/' + this.props.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(x => x.json())
            .then((data) => {
                this.setState({
                    isAdmin: true
                });
                toast.success('Successfully made an admin!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
                this.setState({users: data.data});
            });
    }

    removeAdminRights = () => {
        fetch('http://localhost:5000/admin/remove/' + this.props.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(x => x.json())
            .then((data) => {
                toast.success('Successfully removed admin rights!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
                this.setState({
                    isAdmin: false
                });
            });
    }

    render = () => {
        return (
            <div className="m-3 row mx-auto text-center border border-rounded">
                <div className="card-body col-lg-6">
                    <h5 className="card-title">{this.props.username}</h5>
                </div>
                <div className="card-body col-lg-6">
                    {
                        this.state.isAdmin == true ?
                            (<button onClick={this.removeAdminRights} className="card-title btn btn-outline-danger">Remove Admin Rights</button>) :
                            (<button onClick={this.makeAdmin} className="card-title btn btn-outline-danger">Give Admin Rights</button>)
                    }
                </div>
            </div>
        )
    }
}