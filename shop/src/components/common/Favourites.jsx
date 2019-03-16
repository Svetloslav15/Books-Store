import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import FavouriteWatch from "../common/FavouriteWatch";

export default class Favourites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
        }
    }

    render = () => {
        let watches = [];
        let favourite = JSON.parse(localStorage.getItem('favourite'));
        if (favourite === null || favourite.length === 0){
            return <h3 className="mt-3 text-center">No favourite watches yet!</h3>
        }
        favourite.forEach(el => {
            watches.push(<FavouriteWatch
                id={el._id}
                description={el.description}
                name={el.name}
                price={el.price}
                imageUrl={el.imageUrl}
            />);
        });
        return (
            <main className="container">
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                    <tr className="col-lg-12">
                        <th className="col-lg-6 text-center">Watch</th>
                        <th className="col-lg-3" colspan="3">Price</th>
                        <th className="col-lg-3" colspan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        watches
                    }
                    </tbody>
                </table>
            </main>
        )
    }
}