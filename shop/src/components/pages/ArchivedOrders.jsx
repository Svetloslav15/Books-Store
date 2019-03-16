import React, {Component} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminOrder from "../common/AdminOrder";

export default class ArchivedOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        }
    }

    componentWillMount = () => {
        fetch('http://localhost:5000/orders/get/archived', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(x => x.json())
            .then((data) => {
                this.setState({orders: data.data});
            });
    };

    render = () => {
        let orders = this.state.orders;
        if (this.state.orders.length == 0) {
            return <h3 className="mt-3 text-center">No archived orders!</h3>
        }
        let result = [];
        orders.forEach(el => {
            result.push(<AdminOrder
                id={el._id}
                username={el.userId.username}
                productsCount={el.watches.length}
                price={el.price}
                isPending={el.isPending}
            />);
        });
        return (
            <main className="container mt-3">
                <div>
                    <div className="w-100">
                        <div className=" row text-center">
                            <div className="col-lg-3">Costumer</div>
                            <div className="col-lg-3">Watches Count</div>
                            <div className="col-lg-2">Price</div>
                            <div className="col-lg-2">Status</div>
                            <div className="col-lg-2">Actions</div>
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