import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Watch from '../common/Watch';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
            isLoading: false
        };
    }

    componentWillMount = () => {
        this.setState({isLoading: true});
        fetch('http://localhost:5000/watches/get/best/3', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((x) => x.json())
            .then((data) => {
                console.log(data.data);
                this.setState({watches: data['data']});
                this.setState({isLoading: false});
            }).catch(console.error);
    };

    render() {
        if (this.state.isLoading) {
            return <h2 className="text-center mt-3">Loading...</h2>
        }
        let watches = [];
        console.log(this.state.watches);
        (this.state.watches).forEach(el => {
            if (el) {
                watches.push(<Watch
                    id={el._id}
                    description={el.description}
                    name={el.name}
                    price={el.price}
                    imageUrl={el.imageUrl}
                />);
            }

        })

        return (
            <main>
                <div className="jumbotron w-75 mx-auto mt-3">
                    <h1 className="display-4 text-center mb-3">Welcome to our watch shop!</h1>
                    <p className="my-3 text-center">Here you can find the most unique watches with best prices!</p>
                    <p className="lead row justify-content-center">
                        {
                            localStorage.getItem('token') ?
                                <Link className="btn btn-outline-info btn-lg ml-2 w-7em" to="/shop"
                                      role="button">Shop</Link> :
                                <Link className="btn btn-outline-info btn-lg w-7em" to="/login"
                                      role="button">Register</Link>
                        }
                    </p>
                </div>
                <div className="row text-center mx-auto">
                    <h3 className="my-3 text-center col-lg-12">Newest Watches!</h3>
                    <div className="card-deck justify-content-center">
                        {
                            watches
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default Home;