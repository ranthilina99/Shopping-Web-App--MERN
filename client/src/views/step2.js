import React, {Component} from 'react';
import axios from 'axios';
import logo1 from "../Images/logo.png";
import {Signout} from "../Actions/Authentication";
import Footer from "../Pages/footer";


export default class Step2 extends Component {

    constructor(props) {

        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);

        this.state = {
            token: ''
        }


    }

    onChangeToken(e) {
        this.setState({
            token: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let tokens = {
            token: this.state.token,
            tokenID : this.props.location.id
        };

        console.log(tokens);

        axios.post('http://localhost:4001/step2', tokens)
            .then(res => {
                console.log(res.data);
                }
            ).catch(err => {
                console.log(err.err);
                //this.props.history.push('/step3');
            }
        );


        this.props.history.push('/step3');

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
                <h5 align="center">We have sent you a verification code!</h5>
                <h5 align="center">Please enter the code here:</h5>\

                <div>

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
                                            <label htmlFor="exampleInputMobile">Enter PIN Number</label>
                                            <input type="hidden"
                                                   className="form-control"
                                                   id="exampleInputMobile"
                                                   value={this.props.location.id}
                                                   name="tokenID"/>
                                            <input type="text"
                                                   className="form-control"
                                                   id="exampleInputMobile2"
                                                   onChange={this.onChangeToken}
                                                   value={this.state.token}
                                                   name="token"/>
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
    };
}