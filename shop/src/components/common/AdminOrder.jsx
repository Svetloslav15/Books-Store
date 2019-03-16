import React, {Component} from 'react';
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

export default class AdminOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionDone: false
        }
    }
    makePending = () => {
        fetch('http://localhost:5000/orders/pend/' + this.props.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((x) => x.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    actionDone: true
                });
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            });
    }

    archiveOrder = () => {
        console.log(this.props.id);
        fetch('http://localhost:5000/orders/archive/' + this.props.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((x) => x.json())
            .then((data) => {
                this.setState({
                    actionDone: true
                });
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            });
    }

    render = () => {
        if (this.state.actionDone){
            return "";
        }
        return (
            <div className="m-3 row mx-auto text-center border border-rounded">
                <div className="card-body col-lg-3">
                    <h5 className="card-title">{this.props.username}</h5>
                </div>
                <div className="card-body col-lg-3">
                    <h5 className="card-title">{this.props.productsCount}</h5>
                </div>
                <div className="card-body col-lg-2">
                    <h5 className="card-title">${this.props.price}</h5>
                </div>
                <div className="card-body col-lg-2">
                    {
                        this.props.isPending == true ? (<h5 className="card-title btn btn-outline-warning">Pending</h5>) :
                            (<h5 className="card-title btn btn-outline-danger">Archived</h5>)
                    }
                </div>
                <div className="card-body col-lg-2 text-center">
                    {
                        this.props.isPending == false ?
                            (<button onClick={this.makePending} className="card-title btn btn-outline-warning">Make Pending</button>) :
                            (<button onClick={this.archiveOrder} className="card-title btn btn-outline-danger">Archive Order</button>)
                    }
                    <div className="card-body col-lg-12">
                        <Link to={'/orders/details/' + this.props.id}
                              class="card-title btn btn-info">View</Link>
                    </div>
                </div>

            </div>
        )
    }
}