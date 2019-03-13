import React, {Component} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';


export default class CreateWatchPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            price: 0,
            imageUrl: '',
            description: "",
            isRedirected: false
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = this.state;
        console.log(data);
        fetch('http://localhost:5000/watches/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                price: Number(data.price),
                imageUrl: data.imageUrl,
                description: data.description
            })
        }).then((x) => x.json())
            .then((data) => {
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
                this.setState({
                    isRedirected: true
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render(){
        if (this.state.isRedirected){
            return <Redirect to="/administration/watch/add"/>
        }
        return(
            <main>
                <section class="jumbotron text-dark text-center m-4">
                    <h2 class="ml-5">Add Watch</h2>
                    <form onSubmit={this.handleSubmit} class="ml-5 text-center" method="post" action="#">
                        <div class="form-group col-md-4 m-md-auto demo">
                            <label for="exampleInputUsername">Name:</label>
                            <div class="input-group-prepend">
                                <input type="text" onChange={this.handleChange} class="form-control" name="name" id="exampleInputUsername" placeholder="Name"/>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3" >Description:</label>
                            <div class="input-group-prepend">
                                <textarea class="form-control" onChange={this.handleChange} name="description" placeholder="Description"></textarea>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3" >Image URL:</label>
                            <div class="input-group-prepend">
                                <input type="text" onChange={this.handleChange} class="form-control" name="imageUrl" placeholder="Image URL"/>
                            </div>
                        </div>
                        <div class="form-group col-md-4 mt-2 m-md-auto demo">
                            <label class="mt-3">Price:</label>
                            <div class="input-group-prepend">
                                <input type="number" min="1" onChange={this.handleChange} class="form-control" name="price" placeholder="Price"/>
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