import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        console.log(localStorage.getItem('token'));
        return (
            <main>
                <div className="jumbotron w-75 mx-auto mt-3">
                    <h1 className="display-4 text-center mb-3">Welcome to our watch shop!</h1>
                    <p className="my-3 text-center">Here you can find the most unique watches with best prices!</p>
                    <p className="lead row justify-content-center">
                        {
                            localStorage.getItem('token') ?
                                <Link className="btn btn-outline-info btn-lg ml-2 w-7em" to="/shop" role="button">Shop</Link> :
                                <Link className="btn btn-outline-info btn-lg w-7em" to="/login" role="button">Register</Link>
                        }
                    </p>
                </div>
                <div className="row text-center mx-auto">
                    <h3 className="my-3 text-center col-lg-12">Top 3 Most Liked Watches</h3>
                    <div className="card-deck justify-content-center">
                        <div className="card col-lg-3 text-center">
                            <img className="card-img-top card-image mx-auto mt-2"
                                 src="https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m116503-0004.png?impolicy=upright-majesty"/>
                            <div className="card-body">
                                <h5 className="card-title">Rolex Daytona</h5>
                            </div>
                            <div className="card-footer text-center">
                                <p className="text-muted">200.00 ЛВ</p>
                                <div className="row">
                                    <button type="button"
                                            className="btn btn-outline-info w-7em float-right btn-sm mx-auto p-2">View
                                    </button>
                                    <button type="button"
                                            className="btn btn-outline-success w-7em float-right btn-sm mx-auto p-2">Add To
                                        Cart
                                    </button>
                                </div>
                                <div className="row mt-2">
                                    <button type="button"
                                            className="btn btn-outline-danger w-7em float-right btn-sm mx-auto p-2"><i
                                        className="fas fa-trash-alt"></i></button>
                                    <button type="button"
                                            className="btn btn-outline-warning w-7em float-right btn-sm mx-auto p-2"><i
                                        className="far fa-edit"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card col-lg-3 text-center">
                            <img className="card-img-top card-image mx-auto mt-2"
                                 src="http://est1905.de/wp-content/uploads/2017/05/Submariner_Date_116618LN.jpg"/>
                            <div className="card-body">
                                <h5 className="card-title">Rolex Submariner</h5>
                            </div>
                            <div className="card-footer text-center">
                                <p className="text-muted">200.00 ЛВ</p>
                                <div className="row">
                                    <button type="button"
                                            className="btn btn-outline-info w-7em float-right btn-sm mx-auto p-2">View
                                    </button>
                                    <button type="button"
                                            className="btn btn-outline-success w-7em float-right btn-sm mx-auto p-2">Add To
                                        Cart
                                    </button>
                                </div>
                                <div className="row mt-2">
                                    <button type="button"
                                            className="btn btn-outline-danger w-7em float-right btn-sm mx-auto p-2"><i
                                        className="fas fa-trash-alt"></i></button>
                                    <button type="button"
                                            className="btn btn-outline-warning w-7em float-right btn-sm mx-auto p-2"><i
                                        className="far fa-edit"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card col-lg-3 text-center">
                            <img className="card-img-top card-image mx-auto mt-2"
                                 src="https://www.hublot.com/magento/media/catalog/product/cache/1/small_image/x1000/9df78eab33525d08d6e5fb8d27136e95/b/b/bb_sangbleu_black_new.png"
                                 alt="Harry Potter"/>
                            <div className="card-body">
                                <h5 className="card-title">Hublot Sang Bleu</h5>

                            </div>
                            <div className="card-footer text-center">
                                <p className="text-muted">200.00 ЛВ</p>
                                <div className="row">
                                    <button type="button"
                                            className="btn btn-outline-info w-7em float-right btn-sm mx-auto p-2">View
                                    </button>
                                    <button type="button"
                                            className="btn btn-outline-success w-7em float-right btn-sm mx-auto p-2">Add To
                                        Cart
                                    </button>
                                </div>
                                <div className="row mt-2">
                                    <button type="button"
                                            className="btn btn-outline-danger w-7em float-right btn-sm mx-auto p-2"><i
                                        className="fas fa-trash-alt"></i></button>
                                    <button type="button"
                                            className="btn btn-outline-warning w-7em float-right btn-sm mx-auto p-2"><i
                                        className="far fa-edit"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default Home;