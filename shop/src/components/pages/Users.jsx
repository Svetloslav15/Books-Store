import React, {Component} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import User from "../common/User";

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }
    }

    componentWillMount = () => {
        fetch('http://localhost:5000/admin/get/all', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(x => x.json())
            .then((data) => {
                console.log(data);
                this.setState({users: data.data});
            });
    };

    render = () => {
        let result = [];
        (this.state.users).forEach(el => {
            result.push(<User
                username={el.username}
                id={el._id}
                isAdmin={el.roles.includes('Admin')}
            />);
        });
        return (
            <main className="container mt-3">
                <div>
                    <div className="w-100">
                        <div className=" row text-center">
                            <div className="col-lg-6">Username</div>
                            <div className="col-lg-6">Rights</div>
                        </div>
                    </div>
                    <div className="text-center w-100">
                        {
                            result
                        }
                    </div>
                </div>
            </main>
        )
    }
}