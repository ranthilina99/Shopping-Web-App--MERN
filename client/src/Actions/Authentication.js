import {
    AUTH_USER,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    ADD_TO_CART_USER,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER,
    LOG_OUT,
    CLIENT_ADDRESS,
    REGISTER_FAIL,
    LOAD_SM,
    SERVER_ADDRESS
} from '../Constants/Constants';
import axios from 'axios';
import {setToken} from "../setToken";
import Swal from "sweetalert2";

export const LoadUserOther = async () => {

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }

    return await axios.get(SERVER_ADDRESS + '/api/users');

}

export const LoadUser = () => async dispatch => {

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }

    try {
        const response = await axios.get(SERVER_ADDRESS + '/api/users');

        const position = response.data.position;
        //console.log(position);

        dispatch({
            type: LOAD_USER,
            payload: response.data,
        })


    } catch (e) {

        dispatch({
            type: AUTH_ERROR,
            payload: e
        })
    }

}


export const LoadSeller = () => async dispatch => {

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }

    try {
        const response = await axios.get(SERVER_ADDRESS + '/api/store_manager');

        dispatch({
            type: LOAD_SM,
            payload: response.data
        })

    } catch (e) {

        dispatch({
            type: AUTH_ERROR,
            payload: e
        })

    }

}

export const RegisterUser = (firstName, lastName, email, password) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({firstName, lastName, email, password})
        const response = await axios.post(SERVER_ADDRESS + '/api/users/register', body, config);

        if (response.data !== undefined) {
            RegisteredAlert();
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })


    } catch (e) {

        if (e) {
            RegisterFail();
        }

        dispatch({
            type: REGISTER_FAIL,
            payload: e
        })
    }
}

export const RegisterSeller = (firstName, lastName, position, email, password) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({firstName, lastName, position, email, password})
        const response = await axios.post(SERVER_ADDRESS + '/api/store_manager/sm_register', body, config);

        if (response.data !== undefined) {
            RegisteredSMAlert();
        }


    } catch (e) {

        if (e) {
            RegisterFail();
        }

        dispatch({
            type: REGISTER_FAIL,
            payload: e
        })
    }

}


export const CreditCardEnter = (email, cardNo, date, ccv) => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, cardNo, date, ccv})
        const response = await axios.post(SERVER_ADDRESS + '/api/creditCard/credit_enter', body, config);

        if (response.data !== undefined) {
            RegisteredSMAlert();
        }


    } catch (e) {

        if (e) {
            RegisterFail();
        }

        dispatch({
            type: REGISTER_FAIL,
            payload: e
        })
    }

}

const InvalidLogin = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check your email and password!'
    })
}

const RegisterFail = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registration Error!'
    })
}

const LoggedAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully logged in',
        showConfirmButton: false,
        timer: 3000
    })
}

const RegisteredAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully registered',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisteredSMAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User registered successfully',
        showConfirmButton: false,
        timer: 3000
    });
}


export const LoginUser = (email, password) => async dispatch => {

    try {

        const config = {

            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, password})
        const response1 = await axios.post(SERVER_ADDRESS + '/api/users/login', body, config);

        if (response1.data !== undefined) {
            LoggedAlert();
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response1.data,
        })

        dispatch(LoadUser());

    } catch (e) {
        if (e) {
            InvalidLogin();
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: e
        })
    }
}
export const LoginSeller = (email, password) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, password})
        const response2 = await axios.post(SERVER_ADDRESS + '/api/store_manager/sm_login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response2.data
        })
        dispatch(LoadSeller());

    } catch (e) {
        dispatch({
            type: LOGIN_FAIL,
            payload: e
        })
    }
};

export function authentication() {
    const request = axios.get(SERVER_ADDRESS + `/api/cart/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export const Signout = () => async dispatch => {
    dispatch({
        type: LOG_OUT,
    });

    window.location = CLIENT_ADDRESS;
}