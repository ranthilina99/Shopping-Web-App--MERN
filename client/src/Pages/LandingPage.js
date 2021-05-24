import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Signout} from "../Actions/Authentication";
import logo1 from "../Images/logo.png";
import {Redirect} from "react-router";
import 'font-awesome/css/font-awesome.css';
import Footer from "./footer";
import {connect} from "react-redux";
import {SERVER_ADDRESS} from "../Constants/Constants";


function LandingPage(isLoggedIn) {

    let [user, setUser] = useState({
        userID: ''
    })

    const [Products, setProduct] = useState([])
    const [Cart, setCart] = useState({
        product:[],
        user:'',
        totQuantity:0,
        totAmount:0
    })

    useEffect(() => {
        axios.get(SERVER_ADDRESS + '/cart/')
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
            })
    }, [])

        const addToWishList = (productID) => {
            console.log(productID);
        }

        const addToCarthandler = (product) => {
            setCart({
                user: user.userID,
                product: [...Cart.product,product],
                totQuantity: Cart.totQuantity + 1
            })
            console.log(Cart);
        }

        const viewCart =() =>{
            console.log('this is from views cart redirect');
            return <Redirect to={{
                pathname: '/MyCart',
                state: { myCart: Cart }
            }}
            />
        }

        const ItemList = Products.map((product, index) => {
            return <div className="col-sm-6 col-md-4 mb-3" key={index}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left"
                                 style={{fontWeight: "bold", fontSize: "16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a onClick={() => addToCarthandler(product)}
                                                         className="btn btn-success" role="button">Add To Cart</a></p>
                        </div>
                    </div>
                </div>
            </div>
        })

        return (
            <div>
                <div className="container-parent2">

                    <div className="container-child">
                        <img src={logo1}
                             alt="logo"/>
                    </div>

                    <div className="nav-header navbar-dark bg-dark">
                        <nav className="navbar navbar-expand-xl">
                            <a className="navbar-brand" href="/">Hugo Products Store</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">

                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Category
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/">Trousers</a>
                                            <a className="dropdown-item" href="/">T-Shirt</a>
                                            <a className="dropdown-item" href="/">Shorts</a>
                                            <a className="dropdown-item" href="/">Shoes</a>
                                            <div className="dropdown-divider"/>
                                            <a className="dropdown-item" href="/">Cosmetics</a>
                                            <a className="dropdown-item" href="/">Blouses</a>
                                            <a className="dropdown-item" href="/">Frocks</a>
                                            <a className="dropdown-item" href="/">Skirts</a>
                                            <a className="dropdown-item" href="/">Trouser-Female</a>
                                            <a className="dropdown-item" href="/">Shoes</a>
                                        </div>
                                    </li>

                                    <li className="nav-item active">
                                        <a className="nav-link" href="/feedback">Feedback</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/contact-us">Contact-us <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>

                                <ul className="navbar-nav navbar-right">
                                    <li className="nav-item active">
                                        <a className="nav-link" onClick={()=>viewCart()}><i className="fa fa-shopping-cart fa-2x" />
                                        <span className="badge-success badge-pill">{Cart.totQuantity}</span>
                                        Shopping Cart <span className="sr-only">(current)</span></a>
                                    </li>

                                    <li className="nav-item active">
                                        <button><a className="nav-link btn-success" onClick={() => Signout()}><i
                                            className="fa fa-user fa-2x"/> Logout <span className="sr-only">(current)</span></a>
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {ItemList}
                    </div>
                </div>
                <Footer/>
            </div>
        );

}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});
export default connect(mapStateToProps,{ logOut: Signout})(LandingPage);