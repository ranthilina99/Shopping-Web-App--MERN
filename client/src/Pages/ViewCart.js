import React, {useEffect, useState} from "react";
import {LoginUser} from "../Actions/Authentication";
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import '../CSS/CartView.css';
import "./Components/AlertStyles.css";
import LogedinHeader from "./HeaderLogin";
import {useHistory} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {SERVER_ADDRESS} from "../Constants/Constants";
import Footer from "./footer";

let ViewCart = (props) => {


    let [products, setProducts] = useState([]);
    let [user, setUser] = useState(LoginUser);
    let [userID, setUserID] = useState('');
    let [myCart, setMyCart] = useState([]);
    let [totQuantity, setTotQuantity] = useState(0);
    let [isLoading, setLoad] = useState(true);


    let addToCarthandler = (product) => {
        console.log('It from add to cart' + props.match.params.user)
        setUserID(props.match.params.user);
        setMyCart([...myCart, product]);
        setTotQuantity(totQuantity + 1);

    }

    useEffect(() => {
        setUserID(props.match.params.user);
        console.log("This is user id :" + props.match.params.user);
        setLoad(true);
        axios.get(SERVER_ADDRESS + '/cart/')
            .then(response => {
                setLoad(false);
                setProducts(response.data);

            })
            .catch(error => {
                console.log(error);
            })

    }, []);


    let itemList = () => {
        return products.map((product, i) => (
            <div className="col-md-4 mb-3" key={i}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left"
                                 style={{fontWeight: "bold", fontSize: "16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a style={{color:"white"}} onClick={() => addToCarthandler(product)}
                                                         className="btn btn-success" role="button">Add To Cart</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }


    const history = useHistory();

    const viewCart = () => {
        let path = `/MyCart`;
        history.push({
            pathname: path,
            state: {
                userID: userID,
                myCart: myCart,
                totQuantity: totQuantity
            }
        });
    }

    return (
        <div>
            <LogedinHeader myCart={myCart} totQuantity={totQuantity}
                           userID={userID}/>
            {isLoading ? <div className="text-center"><CircularProgress id="spinner"/></div> :
                <div className="container">
                    <div className="row">
                        {itemList()}
                    </div>
                </div>
            }

            <Fab color="primary" aria-label="add" id="myBtn2" onClick={viewCart}>
                <i className="fa fa-shopping-cart fa-2x"/>
                <span className="badge-success badge-pill">{totQuantity}</span>
                <span className="sr-only">(current)</span>
            </Fab>
            <Footer/>
        </div>
    );


}

export default ViewCart;
