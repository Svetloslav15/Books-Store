import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class FavouriteWatchWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false
        }
    }
    removeFromFavourite = () => {
        let cart = JSON.parse(localStorage.getItem('favourite'));
        cart = cart.filter(x => x._id !== this.props.id);
        localStorage.setItem('favourite', JSON.stringify(cart));
        this.setState({isDeleted: true});
        toast.success('Successfully removed watch from favourite!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    }

    render = () => {
        if (this.state.isDeleted) {
            return <Redirect to="/favourites"/>;
        }
        return (
            <tr className="col-lg-12">
                <td className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-6">
                            <img
                                src={this.props.imageUrl}
                                alt="..." className="cart-image img-cart"/></div>
                        <div className="col-lg-6 mt-3">
                            <h4>{this.props.name}</h4>
                        </div>
                    </div>
                </td>
                <td className="col-lg-3 pr-5" colspan="3">
                    <p className=" mt-3">${this.props.price}</p>
                </td>
                <td className="col-lg-3 actions row mt-3" colspan="3">
                    <div className="cart-btn">
                        <Link to={'/watches/details/' + this.props.id} className="btn btn-outline-info btn-sm mr-3">View</Link>
                        <button onClick={this.removeFromFavourite} className="btn btn-outline-danger btn-sm">Remove</button>
                    </div>
                </td>
            </tr>
        )
    }
}