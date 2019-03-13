import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Watch from '../common/Watch';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
            isLoading: false
        };
    }

    componentWillMount = () => {
        this.setState({isLoading: true});
        fetch('http://localhost:5000/watches/get/all', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((x) => x.json())
            .then((data) => {
                this.setState({watches: data['data']});
                this.setState({isLoading: false});
            }).catch(console.error);
    };

    render() {
        if (this.state.isLoading) {
            return <h2 className="text-center mt-3">Loading...</h2>
        }
        let watches = [];
        (this.state.watches).forEach(el => {
            watches.push(<Watch
                id={el._id}
                description={el.description}
                name={el.name}
                price={el.price}
                imageUrl={el.imageUrl}
            />);
        })
        return (
            <main>
                <div className="card-deck mt-3 justify-content-center">
                    {
                        watches
                    }
                </div>
            </main>
        )
    }
}

export default Shop;