import React, {Component} from "react";
import axios from "axios";
import {LoginUser} from "../Actions/Authentication";
import 'font-awesome/css/font-awesome.css';
import LogedinHeader from "./HeaderLogin";
import Swal from "sweetalert2";
import {SERVER_ADDRESS} from "../Constants/Constants";

export default class MyCart extends Component {
    constructor(props) {
        super(props);

        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.state = {
            user: LoginUser,
            userID: this.props.location.state.userID,
            myCart: this.props.location.state.myCart,
            totQuantity: this.props.location.totQuantity,
            totalAmount: 0
        };
    }

    RemoveFromCarthandler = (product) => {
        const filteredItems = this.state.myCart.filter(item => item._id !== product)
        this.setState({
            myCart: filteredItems
        });
    }

    totalQuantity() {
        let Qty = this.state.myCart.length;
        return (<h4>Total Quantity : {Qty}</h4>);
        console.log(Qty);
    }

    totalAmount() {
        var sum = 0;
        this.state.myCart.forEach(function (obj) {
            sum += obj.PPrice;
        });
        return (<h4>Total Amount To Pay : Rs {sum}</h4>);
    }

    confirmAlart() {
        Swal.fire(
            'Thank You!',
            'Checked Out Successfully',
            'success'
        )
    }

    handleCheckOut(e) {
        e.preventDefault();
        var sum = 0;
        this.state.myCart.forEach(function (obj) {
            sum += obj.PPrice;
        });
        const cart = {
            CUser: this.state.userID,
            CProduct: this.state.myCart,
            CQuantity: this.state.myCart.length,
            CAmount: sum
        }

        console.log(cart);

        axios.post(SERVER_ADDRESS + '/cart/add', cart)
            .then(res => {
                    console.log(res.data);
                    this.confirmAlart();
                window.location = "/Delivery";

                }
            );
    }

    ItemList() {
        const mystyle = {
            width: "100px",
            height: "150px"
        };
        return this.state.myCart.map((product, i) => (
            <div className="d-flex flex-row mt-3" key={i}>

                <img src={product.PImage} className="mh-50" style={mystyle} alt="logo"/>

                <div className="figure-caption ml-3">
                    <h3>{product.PName}</h3>
                    <h4>Rs {product.PPrice}</h4>
                    <button type="button" className="btn btn-danger"
                            onClick={() => this.RemoveFromCarthandler(product._id)}>Remove From Cart
                    </button>
                    <div className="clearfix">
                    </div>
                </div>

            </div>
        ));
    }

    render() {
        const hrStyle = {border: "1px solid red"}
        return (
            <div>
                <LogedinHeader myCart={this.state.myCart} totQuantity={this.state.totQuantity}
                               userID={this.state.userID}/>
                <div className="container bg-light">
                    {this.ItemList()}
                    <hr style={hrStyle}/>
                    <div className="figure-caption pb-5">
                        {this.totalQuantity()}
                        {this.totalAmount()}
                        <button type="button" className="btn btn-success" onClick={this.handleCheckOut}>Check Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}