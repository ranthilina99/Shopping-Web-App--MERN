import React, {useState} from "react";
import {connect} from 'react-redux';
import {CreditCardEnter, Signout} from "../Actions/Authentication";
import logo1 from "../Images/logo.png";
import Footer from "./footer";

const RegisterCredit = ({registerCredit}) => {

    let [data, setData] = useState({
        email: '',
        cardNo: '',
        date: '',
        ccv: ''
    });

    let {email, cardNo, date, ccv} = data;

    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
        console.log("setdata: " + e.target.name);
    }

    const submitData = (event) => {

        event.preventDefault();

        if (email === '' || cardNo === '' || date === '' || ccv === '') {
            return alert("All fields are mandatory !");
        } else {
            registerCredit(email, cardNo, date, ccv);
            setData({
                email: '',
                cardNo: '',
                date: '',
                ccv: ''
            })
        }
    }
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
            <div className="container">
                <div className="register-parent">
                    <div className="register-heading">
                        <div className="heading2">
                            <p>Credit Card</p>
                        </div>
                    </div>

                    <div className="form-parent">

                        <div className="register_form">
                            <form onSubmit={(event) => submitData(event)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail">Email</label>
                                    <input type="email"
                                           className="form-control"
                                           id="exampleInputEmail"
                                           aria-describedby="emailHelp"
                                           onChange={(e) => onChange(e)}
                                           value={email}
                                           name="email" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputCardNo">Card Number</label>
                                    <input type="text"
                                           className="form-control"
                                           id="exampleInputCardNo"
                                           onChange={(e) => onChange(e)}
                                           value={cardNo}
                                           name="cardNo" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputDate">Expire Date</label>
                                    <input type="text"
                                           className="form-control"
                                           id="exampleInputDate"
                                           onChange={(e) => onChange(e)}
                                           value={date}
                                           name="date" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputCCV">CCV</label>
                                    <input type="text"
                                           className="form-control"
                                           id="exampleInputCCV"
                                           onChange={(e) => onChange(e)}
                                           value={ccv}
                                           name="ccv" required/>
                                </div>
                                <br/>
                                <button type="submit"
                                        className="btn btn-primary">Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
const mapStateToProps = state => ({

    isLoggedIn: state.isLoggedIn

})

export default connect(mapStateToProps,{ registerCredit: CreditCardEnter })(RegisterCredit);