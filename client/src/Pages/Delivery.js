import React, {Component} from 'react';
import Swal from 'sweetalert2'
import { Route } from 'react-router-dom';
import {Signout} from "../Actions/Authentication";
import Footer from "./footer";
import logo1 from "../Images/logo.png";
import axios from "axios";

class DeliveryForm extends Component {
    constructor(props) {
        super(props);
    }

    click() {
        var self = this;
        axios.get("http://localhost:4001/step1", {})
            .then((rep) => {
                self.rep = rep.data;
            })
            .catch((err) => {
                self.rep = err;
            })

    }

    confirmAlart() {
        Swal.fire(
            'Good job!',
            'New Product Successfully Added!',
            'success'
        )
    }

    render() {
        return (
            <div>
                <div className="container-parent2">

                    <div className="container-child">
                        <img src={logo1}
                             alt="logo"/>
                    </div>

                    <div className="nav-header navbar-dark bg-dark">
                        <nav className="navbar navbar-expand-xl">
                            <a className="navbar-brand" href="/CartView">Hugo Products Store</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">

                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/LandingPage">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/feedback">Feedback</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/contact-us">Contact-us <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>

                                <ul className="navbar-nav navbar-right">
                                    <li className="nav-item active">
                                        <button><a className="nav-link btn-success" onClick={() => Signout()}><i
                                            className="fa fa-user fa-2x"/> Logout <span className="sr-only">(current)</span></a>
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row-content row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <h1>Delivery Details</h1>&nbsp;
                    </div>
                    <div className="col-12 col-md-9">
                        <form>
                            <div className="form-group row">
                                <label for="Address" className="col-md-2 col-form-label">Address</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="Address" name="Address"
                                           placeholder="Address"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <label htmlFor="mobile" className="col-md-2 col-form-label">Mobile No</label>
                                <div className="col-md-10">
                                    <input type="number" className="form-control" id="mobile" name="mobile"
                                           placeholder="Mobile Number"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <label htmlFor="Postal" className="col-md-2 col-form-label">Postal Code:</label>
                                <div className="col-md-10">
                                    <input type="Number" className="form-control" id="postal" name="postal"
                                           placeholder="Postal Code"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <div className="offset-2 col-md-10">
                                    <div className="row">
                                        <div>
                                            <Route render={({ history}) => (
                                                <button
                                                    type='submit' className="btn btn-primary"
                                                    onClick={() => { history.push('/credit_cart') }}
                                                >Credit Card
                                                </button>
                                            )} />
                                        </div>
                                        <div>
                                            {/*<button onClick={this.click.bind(this)}><a href='/step1'> click me</a></button>*/}

                                            <Route render={({ history}) => (
                                                <button
                                                    type='submit' className="btn btn-primary"
                                                    onClick={() => { history.push('/step1') }}>
                                                    Mobile
                                                </button>
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default DeliveryForm;
