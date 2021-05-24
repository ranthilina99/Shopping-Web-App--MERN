import React, {Component} from 'react';
import Swal from 'sweetalert2'
import {Signout} from "../Actions/Authentication";
import Footer from "./footer";
import logo1 from "../Images/logo.png";

class Mobile extends Component {
    constructor(props) {
        super(props);
    }

    confirmAlart() {
        Swal.fire(
            'Good job!',
            'New Product Successfully Added!',
            'success'
        )
    }

    onSubmit(e) {
        e.preventDefault();
        this.confirmAlart();
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
                                        <a className="nav-link" href="/contact-us">Contact-us <span
                                            className="sr-only">(current)</span></a>
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
                        <h1>Mobile Details</h1>&nbsp;
                    </div>
                    <div className="col-12 col-md-9">
                        <form method="post" action="step2.handlebars">
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-md-2 col-form-label">Amount</label>
                                <div className="col-md-10">
                                    <input type="Number" className="form-control" id="amount" name="amount"
                                           placeholder="Amount"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <label htmlFor="mobile" className="col-md-2 col-form-label">Mobile Number</label>
                                <div className="col-md-10">
                                    <input type="tel" className="form-control" id="mobile" name="mobile"
                                           placeholder="Mobile Number"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <div className="offset-md-2 col-md-10">
                                    <button type="submit" className="bt btn-primary">Submit</button>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <label htmlFor="pin" className="col-md-2 col-form-label">Pin Number</label>
                                <div className="col-md-10">
                                    <input type="Number" className="form-control" id="pin" name="pin"
                                           placeholder="4 Digit Pin Number"/>
                                </div>
                            </div>
                            &nbsp;
                            <div className="form-group row">
                                <div className="offset-md-2 col-md-10">
                                    <button type="submit" className="bt btn-primary">Submit</button>
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
export default Mobile;
