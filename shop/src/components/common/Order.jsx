import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import {isAdmin, isAuthed} from "../../hocs/privateRoutes";
import 'react-toastify/dist/ReactToastify.css';

export default class Order extends Component {
    constructor(props) {
        super(props);

    }

    render = () => {
        return (
               <div className="m-3 row mx-auto text-center border border-rounded">
                   <div className="card-body col-lg-3">
                       <h5 className="card-title">{this.props.id}</h5>
                   </div>
                   <div className="card-body col-lg-3">
                       <h5 className="card-title">{this.props.productsCount}</h5>
                   </div>
                   <div className="card-body col-lg-2">
                       <h5 className="card-title">${this.props.price}</h5>
                   </div>
                   <div className="card-body col-lg-2">
                       {
                           this.props.isPending == true ? (<h5 className="card-title btn btn-outline-warning">Pending</h5>) :
                               (<h5 className="card-title btn btn-outline-danger">Archived</h5>)
                       }
                   </div>
                   <div className="card-body col-lg-2">
                       <Link to={'/orders/details/' + this.props.id}
                             class="card-title btn btn-info">View</Link>
                   </div>
               </div>
        )
    }
}