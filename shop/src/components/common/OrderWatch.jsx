import React, {Component} from 'react';

export default class OrderWatch extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div class="w-100 row border border-rounded m-2 text-center">
                <div class="col-lg-10 row justify-content-center">
                    <img
                        src={this.props.imageUrl}
                        alt="..." class="cart-image mx-3  img-cart"/>
                    <div class="col-lg-5 mt-3">
                        <h4>{this.props.name}</h4>
                    </div>
                </div>

                <div class="col-lg-2 pr-5">
                    <p class=" mt-3">${this.props.price}</p>
                </div>
            </div>
        )
    }
}