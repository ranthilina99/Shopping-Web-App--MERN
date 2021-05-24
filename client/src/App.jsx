import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import Register from './Pages/Register';
import store from "./Store";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {LoadUser} from "./Actions/Authentication";
import {setToken} from "./setToken";
import CustomerPages from "./Pages/CustomerPages";
import AdminPages from "./Pages/Admin/AdminPages";
import CheckedOutCarts from "./Pages/CartsChecked"
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import ViewCart from "./Pages/ViewCart";
import AllItems from "./Pages/AllItems"
import LandingPage from "./Pages/LandingPage";
import Reducer from './Reducers'
import { createStore } from 'redux';
import MyCart from './Pages/MyCart'
import DeliveryForm from "./Pages/Delivery";
import CreditCard from "./Pages/CreditCard";
import Mobile from "./Pages/Mobile";
import registerCredit from "./Pages/CreditCard"
import ViewPages from "./views/step1";
import ViewPage2 from "./views/step2";
import ViewPage3 from "./views/step3";

const userData = createStore(Reducer);


if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
const App = () => {

    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);

    return (
        <div className="page-container">

            <div className="content-wrap">

            <Provider store={store}>

                <Router>
                    <Switch>
                        <Route path="/step1" component={ViewPages}/>
                        <Route path="/step2" component={ViewPage2}/>
                        <Route path="/step3" component={ViewPage3}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/allProduct/:name" component={AllItems}/>
                        <Route path="/CustomerPages" component={CustomerPages}/>
                        <Route path="/admin" component={AdminPages}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Route path="/contact-us" component={ContactUs}/>
                        <Route path="/ViewCart/:user" component={ViewCart}/>
                        <Route path="/Delivery" component={DeliveryForm}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/credit_cart" component={registerCredit}/>
                        <Route path="/Mobile" component={Mobile}/>
                        <Route path="/LandingPage" component={LandingPage}/>
                        <Route path="/MyCart" component={MyCart}/>
                        <Route path="/CheckedOutCarts/:user" component={CheckedOutCarts}/>
                        <Route path="/" component={Dashboard}/>
                    </Switch>
                </Router>
            </Provider>
            </div>

        </div>
    );
}
export default App;
