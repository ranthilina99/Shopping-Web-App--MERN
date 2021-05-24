import {
    ADD_TO_CART_USER,
    AUTH_USER,
} from '../Constants/Constants';


export default function(state={},action){
    switch (action.type) {
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case ADD_TO_CART_USER:
            return {...state,userData:{
                    ...state.userData,
                    cart: action.playload
                }
            }

        default:
            return state;
    }

}
