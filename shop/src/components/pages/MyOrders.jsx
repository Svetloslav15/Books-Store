import React, {Component} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Order from "../common/Order";

export default class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        }
    }

    componentWillMount = () => {
        let myId = localStorage.getItem('userId');
        fetch('http://localhost:5000/orders/mine/' + myId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(x => x.json())
            .then((data) => {
                this.setState({orders: data.data});
            });
    };
    checkout = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        fetch('http://localhost:5000/orders/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                watches: cart,
                price: this.state.allPrice,
                userId: localStorage.getItem('userId')
            })
        }).then(x => x.json())
            .then((data) => {
                localStorage.removeItem('cart');
                this.setState({isCheckout: true});
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            });
    };

    render = () => {

        let orders = this.state.orders;
        if (orders == null || orders.length == 0) {
            return <h3 className="mt-3 text-center">No orders yet!</h3>
        }
        let result = [];
        orders.forEach(el => {
            result.push(<Order
                id={el._id}
                productsCount={el.watches.length}
                price={el.price}
                isPending={el.isPending}
            />);
        });
        return (
            <main className="container my-2">
                <div className="table table-hover table-condensed">
                    <div className="w-100">
                    <div className="w-100 row text-center">
                        <div className="col-lg-3">OrderId</div>
                        <div className="col-lg-3">Watches Count</div>
                        <div className="col-lg-2">Price</div>
                        <div className="col-lg-2">Status</div>
                        <div className="col-lg-2">Action</div>
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