import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import {isAdmin} from "../../hocs/privateRoutes";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartWatch from "../common/CartWatch";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
            allPrice: 0
        }
    }

    componentDidMount = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let allPrice = 0;
        if (cart != null) {
            cart.forEach(x => {
                allPrice += Number(x.price)
            });
        }

        this.setState({allPrice});
    }
    render = () => {
        let watches = [];
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null || cart.length == 0) {
            return <h3 className="mt-3 text-center">No watches into cart yet!</h3>
        }
        cart.forEach(el => {
            watches.push(<CartWatch
                id={el.id}
                description={el.description}
                name={el.name}
                price={el.price}
                imageUrl={el.imageUrl}
            />);
        });
        return (
            <main class="container">
                <table id="cart" class="table table-hover table-condensed">
                    <thead>
                    <tr class="col-lg-12">
                        <th class="col-lg-6 text-center">Watch</th>
                        <th class="col-lg-3" colspan="3">Price</th>
                        <th class="col-lg-3" colspan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        watches
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <Link class="btn btn-outline-warning" to="/shop">
                                <i class="fa fa-angle-left"></i>
                                Continue Shopping
                            </Link>
                        </td>
                        <td colspan="2" class="hidden-xs"></td>
                        <td class="hidden-xs text-center"><strong>Total: ${this.state.allPrice}</strong></td>
                        <td>
                            <button class="btn btn-outline-success btn-block">
                                Checkout
                                <i class="fa fa-angle-right"></i>
                            </button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </main>
        )
    }
}