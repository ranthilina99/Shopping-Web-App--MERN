import React, {useState} from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {RegisterUser} from "../Actions/Authentication";
import Header from "./Header";
import Footer from "./footer";
import '../CSS/register.css';

const Register = ({isLoggedIn, registerUser}) => {

    let [data,setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''

    });

    if (isLoggedIn)
        return <Redirect to={"/login"}/>;

    let {firstName, lastName, email, password} = data;
    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const submitData = (event) => {

        event.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || password === '') {
            return alert("All the Values are Required");
        } else {
            registerUser(firstName, lastName, email, password);
        }
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="register-parent">
                    <div className="register-heading">
                        <div className="heading2">
                            <p>Register</p>
                        </div>
                    </div>
                    <div className="form-parent">
                        <div className="register_form">
                            <form onSubmit={(event) => submitData(event)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFirstName">First Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="exampleInputFirstName"
                                           onChange={(e) => onChange(e)}
                                           value={firstName}
                                           name="firstName" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputLastName">Last Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="exampleInputLastName"
                                           onChange={(e) => onChange(e)}
                                           value={lastName}
                                           name="lastName" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email"
                                           className="form-control"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           onChange={(e) => onChange(e)}
                                           value={email}
                                           name="email" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           id="exampleInputPassword1"
                                           onChange={(e) => onChange(e)}
                                           value={password}
                                           name="password" required/>
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

export default connect(mapStateToProps,{ registerUser: RegisterUser })(Register);