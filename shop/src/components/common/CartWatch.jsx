import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class CartWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false
        }
    }
    removeFromCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let result = [];

        cart = cart.filter(x => x._id != this.props.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({isDeleted: true});
        toast.success('Successfully removed watch from cart!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    }

    render = () => {
        if (this.state.isDeleted) {
            return <Redirect to="/cart"/>;
        }
        return (
            <tr class="col-lg-12">
                <td class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-6">
                            <img
                                src={this.props.imageUrl}
                                alt="..." class="cart-image img-cart"/></div>
                        <div class="col-lg-6 mt-3">
                            <h4>{this.props.name}</h4>
                        </div>
                    </div>
                </td>
                <td class="col-lg-3 pr-5" colspan="3">
                    <p class=" mt-3">${this.props.price}</p>
                </td>
                <td class="col-lg-3 actions row mt-3" colspan="3">
                    <div className="cart-btn">
                        <Link to={'/watches/details/' + this.props.id} class="btn btn-outline-info btn-sm mr-3">View</Link>
                        <button onClick={this.removeFromCart} class="btn btn-outline-danger btn-sm">Remove</button>
                    </div>
                </td>
            </tr>
        )
    }
}