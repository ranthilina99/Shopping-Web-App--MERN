import React from "react";
import {connect} from "react-redux";
import {Signout} from "../Actions/Authentication";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";


const CustomerPages = ({isLoggedIn,logOut}) => {

    return (
        <div>
            <Header/>
        <div>
            <h1>Customer Pages</h1>
            {
                isLoggedIn ? (

                        <div>
                            <h1>You have log in</h1>
                            <br/>

                            <button onClick={() => logOut()}>
                                Log out
                            </button>
                        </div>
                    ) :
                    (
                        <div>
                            <Redirect to="/"></Redirect>
                        </div>
                    )
            }
        </div>
            <Footer/>
        </div>
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut: Signout})(CustomerPages);