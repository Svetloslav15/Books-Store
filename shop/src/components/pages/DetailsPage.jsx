import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, Link} from 'react-router-dom';
import {isAdmin} from "../../hocs/privateRoutes";

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watchId: "",
            name: "",
            price: 0,
            imageUrl: '',
            description: "",
            isInFavourites: false,
            isDeleted: false
        }
    }
    deleteWatch = () => {
        fetch('http://localhost:5000/watches/delete/' + this.state.watchId, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: this.state.watchId
            })
        }).then(x => x.json())
            .then((data) => {
                let favourite = JSON.parse(localStorage.getItem('favourite'));
                if (favourite){
                    favourite = favourite.filter(x => x._id != this.state.watchId);
                    localStorage.setItem('favourite', JSON.stringify(favourite));
                }

                let cart = JSON.parse(localStorage.getItem('cart'));
                if (cart){
                    cart = cart.filter(x => x._id != this.state.watchId);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

                this.setState({isDeleted: true});
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });
            })
    }
    addToCart = () => {
        let watch = {
            _id: this.state.watchId,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            imageUrl: this.state.imageUrl,
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
        toast.success('Successfully added watch to cart!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    };
    addToFavourite = () => {
        let watch = {
            _id: this.state.watchId,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            imageUrl: this.state.imageUrl,
        };
        let favourite = JSON.parse(localStorage.getItem('favourite'));
        if (favourite == null){
            favourite = [];
        }
        favourite.push(watch);
        localStorage.setItem('favourite', JSON.stringify(favourite));
        this.setState({isInFavourites: true});
        toast.success('Successfully added watch to favourites!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    };
    removeFromFavourite = () => {
        let watch = {
            _id: this.state.watchId,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            imageUrl: this.state.imageUrl,
        };
        let favourite = JSON.parse(localStorage.getItem('favourite'));
        if (favourite == null){
            favourite = [];
        }
        favourite = favourite.filter(x => x._id != watch._id);

        localStorage.setItem('favourite', JSON.stringify(favourite));
        this.setState({isInFavourites: false});
        toast.success('Successfully removed watch from favourites!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000
        });
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        this.setState({
            watchId: id
        });
        fetch('http://localhost:5000/watches/get/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((x) => x.json())
            .then((data) => {
                data = data.data;
                this.setState({
                    name: data.name,
                    price: +data.price,
                    imageUrl: data.imageUrl,
                    description: data.description
                });
                let watch = {
                    name: data.name,
                    price: +data.price,
                    imageUrl: data.imageUrl,
                    description: data.description,
                    _id: this.state.watchId
                }
                if (JSON.parse(localStorage.getItem('favourite')).filter(x => x._id == this.state.watchId).length != 0){
                    this.setState({isInFavourites: true});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.isDeleted){
            return <Redirect to="/shop"/>
        }
        return (
            <main>
                <section className="jumbotron text-dark text-center m-4 row">
                    <div className="col-lg-4">
                        <img src={this.state.imageUrl}
                             alt="watch"
                             className="w-100 border border-white p-1 rounded"/>
                    </div>
                    <div className="col-lg-8 mt-5">
                        <h3 name="name" className="text-center mb-5">{this.state.name}</h3>
                        <h5 name="description">{this.state.description}</h5>
                        <h3 className="my-5">Price: ${this.state.price}</h3>
                        <div className="mt-5 row justify-content-center">
                            <div className="col-lg-3">
                                <button onClick={this.addToCart} className="btn btn-outline-success p-3 w-100"><i
                                    className="fas fa-shopping-cart mr-1"></i> Buy</button>
                            </div>
                            {
                                !this.state.isInFavourites ? ( <div className="col-lg-3">
                                    <button onClick={this.addToFavourite} className="btn btn-outline-danger p-3 w-100"><i
                                        className="fas fa-heart"></i> Add to favourite</button>
                                </div>) : ( <div className="col-lg-3">
                                    <button onClick={this.removeFromFavourite} className="btn btn-outline-danger p-3"><i
                                        className="fas fa-heart"></i> Remove from favourite</button>
                                </div>)
                            }
                        </div>
                        {
                            isAdmin() == true ? ( <div className="mt-3 row justify-content-center">
                                <div className="col-lg-3">
                                    <Link to={'/watches/edit/' + this.state.watchId} className="btn btn-outline-warning p-3 w-100"><i
                                        className="fas fa-edit"></i> Edit</Link>
                                </div>
                                <div className="col-lg-3">
                                    <button onClick={this.deleteWatch} className="btn btn-outline-danger p-3 w-100"><i
                                        className="fas fa-trash-alt"></i> Delete</button>
                                </div>
                            </div>) : ""
                        }

                    </div>
                </section>
            </main>
        )
    }
}