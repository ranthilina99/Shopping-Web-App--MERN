import axios from 'axios';
import {AUTH_USER, SERVER_ADDRESS} from '../Constants/Constants';

export function auth() {
    const request = axios.get(SERVER_ADDRESS + `/api/cart/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}
