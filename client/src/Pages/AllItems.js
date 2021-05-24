import React, {Component} from 'react';
import "../CSS/AllProduct.css"
import Header from "./Header";
import $ from "jquery";
import axios from "axios";
import {SERVER_ADDRESS} from "../Constants/Constants";
import LinearProgress from '@material-ui/core/LinearProgress';

class AllItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
        this.productList = this.productList.bind(this);
    }

    componentDidMount() {

        axios.get(SERVER_ADDRESS + '/product/')
            .then(response => {
                this.setState({
                    products :response.data,
                    loading :false
                })
                console.log(this.state.products);
            })
            .catch(error => {
                console.log(error);
            })
    }

    ReadMore(){
        var $el, $ps, $up ,$p , totalHeight;

        $(".sidebar-box .button").click(function() {

            totalHeight = 0

            $el = $(this);
            $p  = $el.parent();
            $up = $p.parent();
            $ps = $up.find("p:not('.read-more')");

            $ps.each(function() {
                totalHeight += $(this).outerHeight();
            });

            $up
                .css({
                    "height": $up.height(),
                    "max-height": 9999
                })
                .animate({
                    "height": totalHeight
                });

            $p.fadeOut();

            return false;

        });

    }

    strikeThrough(text) {
        return text
            .split('')
            .map(char => char + '\u0336')
            .join('')
    }

    productList(){
        return this.state.products.filter((prod) => prod.PCategory===this.props.match.params.name).map((product,i) =>(
            <div className="col-md-4 mb-1" key={i}>
                <div className="img-thumbnail">
                    <img className="img-responsive" alt="logo" width={200} height={350} src={product.PImage}/>
                    <div className="figure-caption ml-3">
                        <div className="sidebar-box">
                            <h3>{product.PName}</h3>
                            <p>{product.PDescription}</p>
                            <p className="read-more"><a href="#" onClick={this.ReadMore()} className="button">Read More</a></p>
                        </div>
                        <div className="clearfix">
                            <div className="pull-left" style={{fontWeight:"bold" ,fontSize:"16px",colour:"green"}}>{product.PDiscount === 0 ? product.PPrice.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'LKR'
                            }) : this.strikeThrough(product.PPrice.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'LKR'
                            }))+" Offers to : " +(product.PPrice - (product.PDiscount*product.PPrice)/100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'LKR'
                            })}</div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }



    render() {
        return (
            <div>
                <Header/>

                <div className="p-3 mb-2 bg-dark text-light text-center"><h1>{this.props.match.params.name}</h1></div>
                {this.state.loading ? <LinearProgress /> :
                    <div className="container-xl d-flex justify-content-center">
                        <div className="row">
                            {this.productList()}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AllItems;