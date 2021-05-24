import React, {useState} from "react";
import {connect} from 'react-redux';
import {RegisterSeller} from "../../Actions/Authentication";


const RegisterSell = ({registerSM}) => {

    let [data, setData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: ''

    });

    let {firstName, lastName, position, email, password} = data;

    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
        console.log("setdata: " + e.target.name);
    }

    const submitData = (event) => {

        event.preventDefault();

        if (firstName === '' || lastName === '' || position === '' || email === '' || password === '') {
            return alert("All fields are mandatory !");
        } else {
            registerSM(firstName, lastName, position, email, password);
            setData({
                firstName: '',
                lastName: '',
                position: '',
                email: '',
                password: ''
            })
        }
    }

    return (

        <div>

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
                                    <label htmlFor="exampleInputLastName">Position</label>
                                    <select
                                        className="form-control"
                                        name="position"
                                        id="exampleInputPosition"
                                        value={position}
                                        onChange={(e) => onChange(e)}
                                        required>
                                        <option value="" selected disabled>Select&nbsp;Position</option>
                                        <option value={'sm'}>Store&nbsp;Manager</option>
                                        <option value={'admin'}>Administrator</option>

                                    </select>

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
        </div>
    );
}
const mapStateToProps = state => ({

    isLoggedIn: state.isLoggedIn

})

export default connect(mapStateToProps,{ registerSM: RegisterSeller })(RegisterSell);