import React, {Component} from 'react';
import axios from 'axios';
import logo1 from "../Images/logo.png";
import {Signout} from "../Actions/Authentication";
import Footer from "../Pages/footer";

export default class Step1 extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);

        this.state = {
            number: ''
        }
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const phone_number = {
            number: this.state.number
        }

        console.log(phone_number);

        axios.post('http://localhost:4001/step1', phone_number)
            .then(res => {
                console.log(res.data);

                this.props.history.push({
                    pathname: '/step2',
                    id: res.data.id
                });
                }
            );


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
            <>
                <h5 align="center" color="red">Please enter your phone number (in international format, starting with +) to receive a verification
                    code:</h5>
                <div>
                    {/*<input type="tel" name="number" />*/}
                    {/*<form onSubmit={this.onSubmit} >*/}
                    {/*<input type="tel"*/}
                    {/*       className="form-control"*/}
                    {/*       id="exampleInputFirstName"*/}
                    {/*       onChange={this.onChangeNumber}*/}
                    {/*       value={this.state.number}*/}
                    {/*       name="number"/>*/}

                    {/*/!*<input type="submit" value="Send code" />*!/*/}
                    {/*<button type="submit" className="btn btn-primary">*/}
                    {/*        Send code*/}
                    {/*</button>*/}
                    {/*</form>*/}
                    <div className="container">
                        <div className="register-parent">
                            <div className="register-heading">
                                <div className="heading2">
                                    <p>Mobile</p>
                                </div>
                            </div>

                            <div className="form-parent">

                                <div className="register_form">
                                    <form onSubmit={this.onSubmit} >
                                        <div className="form-group">
                                            <label htmlFor="exampleInputMobile">Enter Mobile Number</label>
                                            <input type="tel"
                                                   className="form-control"
                                                   id="exampleInputMobile"
                                                   onChange={this.onChangeNumber}
                                                   value={this.state.number}
                                                   name="number"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Send code
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Footer/>
            </div>
        );
    }
}


