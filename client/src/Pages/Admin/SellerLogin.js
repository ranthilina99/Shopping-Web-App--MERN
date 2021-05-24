import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LoginSeller} from "../../Actions/Authentication";
import '../../CSS/Login.css'
import Header from "../Header";
import Footer from "../footer";

const SellerLogin = ({loginSM, isLoggedIn}) => {

    let [data, setData] = useState({
        email: '',
        password: ''
    });
    let {email, password} = data;
    if (isLoggedIn) {
        return <Redirect to="/sm_pages"/>
    }

    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const submitData = () => {
        loginSM(email, password);
    };

    return (
        <div>
            <Header/>
            <div className="container">

                <div className="whole-page">
                    <div className="parent-heading-1 col-md-auto">
                        <div className="heading1">
                            <p>LOGIN</p>
                        </div>
                    </div>

                    <div className="login_form ">
                        <div className="form-group-1">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   onChange={(e) => onChange(e)}
                                   value={email}
                                   name="email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone
                                else.</small>
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   onChange={(e) => onChange(e)}
                                   value={password}
                                   name="password"/>
                        </div>

                        <button type="submit"
                                className="btn btn-primary"
                                onClick={() => submitData()}>Submit
                        </button>


                        <br/>
                        <br/>
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

export default connect(mapStateToProps, {loginSM: LoginSeller})(SellerLogin);