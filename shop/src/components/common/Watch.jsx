import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import {isAdmin, isAuthed} from "../../hocs/privateRoutes";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false
        }
    }
    deleteWatch = () => {
        fetch('http://localhost:5000/watches/delete/' + this.props.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id
            })
        }).then(x => x.json())
            .then((data) => {
                console.log(data);
                this.setState({isDeleted: true});
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            })
    }
    addToCart = () => {
        let watch = {
            _id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
            imageUrl: this.props.imageUrl,
        };
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null){
            cart = [];
        }
        let ids = cart.map(x => x._id);
        if (ids.includes(watch._id)){
            toast.warn('Watch is already added to the cart!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
            return;
        }
        cart.push(watch);
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success('Successfully added watch to the cart!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    };

    render = () => {
        if (this.state.isDeleted) {
            return "";
        }
        return (
            <div className="col-lg-3 m-3 text-center border border-rounded">
                <img className="card-img-top card-image mx-auto mt-2"
                     src={this.props.imageUrl}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                </div>
                <div className="card-footer text-center">
                    <p className="text-muted">{this.props.price} ЛВ</p>
                    <div className="row">
                        <Link to={'/watches/details/' + this.props.id}
                              class="btn btn-outline-info w-7em float-right btn-sm mx-auto p-2">View</Link>
                        {
                            isAuthed() ? (<button onClick={this.addToCart}
                                                  className="btn btn-outline-success w-7em float-right btn-sm mx-auto p-2">
                                Add To Cart
                            </button>) : ""
                        }
                    </div>
                    {
                        isAdmin() == true ? (<div className="row mt-2">
                            <button onClick={this.deleteWatch}
                                    className="btn btn-outline-danger w-7em float-right btn-sm mx-auto p-2">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <Link to={"/watches/edit/" + this.props.id} className="btn btn-outline-warning w-7em float-right btn-sm mx-auto p-2">
                                <i className="far fa-edit"></i>
                            </Link>
                        </div>) : ""
                    }
                </div>
            </div>
        )
    }
}