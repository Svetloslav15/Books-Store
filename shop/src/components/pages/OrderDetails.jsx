import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {isAdmin} from "../../hocs/privateRoutes";
import OrderWatch from "../common/OrderWatch";

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
            orderId: "",
            username: "",
            allPrice: 0
        }

    }

    componentWillMount = () => {
        let id = this.props.match.params.id;
        this.setState({
            orderId: id
        });
        fetch('http://localhost:5000/orders/get/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((x) => x.json())
            .then((data) => {
                console.log(data);
                data = data.data;
                this.setState({
                    watches: data.watches,
                    username: data.userId.username,
                    allPrice: data.price
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render = () => {
        let watches = [];
        (this.state.watches).forEach((el) => {
            watches.push(<OrderWatch
                imageUrl={el.imageUrl}
                name={el.name}
                price={el.price}/>);
        });

        return (
            <main class="container">
                <div className="col-lg-12 my-2 text-center">
                    <h3>Costumer: {this.state.username}</h3>
                    <h3>All Price: ${this.state.allPrice}</h3>
                </div>
                <div class="table table-hover table-condensed">
                    <div>
                        <div class="w-100 row my-4">
                            <div class="w-75 text-center">Watch</div>
                            <div class="w-25 text-center">Price</div>
                        </div>
                    </div>
                    <div>
                        {
                            watches
                        }
                    </div>
                </div>
            </main>
        )
    }
}