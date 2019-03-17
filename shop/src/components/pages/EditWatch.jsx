import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';


export default class EditWatch extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            price: 0,
            imageUrl: '',
            description: "",
            id: this.props.match.params.id,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentWillMount = () => {
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
                    price: data.price,
                    imageUrl: data.imageUrl,
                    description: data.description,
                });
            }).catch(console.error);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let data = this.state;
        fetch('http://localhost:5000/watches/edit/' + this.state.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                price: Number(data.price),
                imageUrl: data.imageUrl,
                description: data.description
            })
        }).then((x) => x.json())
            .then((data) => {
                console.log(data);
                if (!data.success){
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000
                    });
                    return;
                }
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                });

            })
            .catch(err => {
                console.log(err);
            })
    }
    render(){

        return(
            <main>
                <section class="jumbotron text-dark text-center m-4">
                    <h2 class="ml-5">Edit Watch</h2>
                    <form onSubmit={this.handleSubmit} class="ml-5 text-center" method="post" action="#">
                        <div class="form-group col-md-4 m-md-auto demo">
                            <label for="exampleInputUsername">Name:</label>
                            <div class="input-group-prepend">
                                <input type="text" onChange={this.handleChange} class="form-control" value={this.state.name} name="name" id="exampleInputUsername" placeholder="Name"/>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3" >Description:</label>
                            <div class="input-group-prepend">
                                <textarea class="form-control" onChange={this.handleChange} value={this.state.description} name="description" placeholder="Description"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3" >Image URL:</label>
                            <div class="input-group-prepend">
                                <input type="text" onChange={this.handleChange} value={this.state.imageUrl} class="form-control" name="imageUrl" placeholder="Image URL"/>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3">Price:</label>
                            <div class="input-group-prepend">
                                <input type="number" min="1" onChange={this.handleChange} value={this.state.price} class="form-control" name="price" placeholder="Price"/>
                            </div>
                        </div>
                        <div class="d-block m-auto">
                            <button type="submit" class="btn btn-outline-info p-md-3 mt-5 text-uppercase h5">Submit</button>
                        </div>
                    </form>
                </section>
            </main>

        )
    }
}