import React from "react";
import {connect} from "react-redux";
import {Signout} from "../../Actions/Authentication";
import Swal from "sweetalert2";
import {CLIENT_ADDRESS} from "../../Constants/Constants";


const AdminLogout = ({isLoggedIn,logOut}) => {

    return (
        <div>
                {
                    isLoggedIn ? (
                            logoutAlert(logOut)
                        ) :
                        (
                            window.location = CLIENT_ADDRESS + "/admin"
                        )
                }

        </div>
    );
}

const logoutAlert = (logOut) =>{
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to log out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want!'
    }).then((result) => {
        if (result.isConfirmed) {
            logOut()
        } else {
            window.location = CLIENT_ADDRESS + "/admin";
        }
    })
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut: Signout})(AdminLogout);