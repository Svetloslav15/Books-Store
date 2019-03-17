import React, {Component} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import OrderWatch from "../common/OrderWatch";
import jsPDF from 'jspdf';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watches: [],
            orderId: "",
            username: "",
            allPrice: 0,
        }

    }

    componentWillMount = async () => {
        let id = this.props.match.params.id;
        this.setState({
            orderId: id
        });
        fetch('http://localhost:5000/orders/get/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((x) => x.json())
            .then((data) => {
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
            <main className="container">
                <div  id='order-container'>
                    <div className="col-lg-12 my-2 ">
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
                </div >
            </main>
        )
    }
}