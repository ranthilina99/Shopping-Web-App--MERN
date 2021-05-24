import React from "react";
import "../CSS/Dashboard.css";
import image1 from "../Images/image1.jpg";
import image3 from "../Images/image3.jpg";
import image7 from "../Images/image7.jpg";
import Header from "./Header";
import Footer from "./footer";

const Dashboard = () => {
    return (
    <div>
        <Header/>
        <div className="container">
            <div className="row row-content">
                <div className="col">
                    <div id="mycarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block img-fluid"
                                     src={image1} alt="dressnew1"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2>Electronics <span className="badge badge-danger">NEW</span> <span
                                            className="badge badge-pill badge-secondary"> $4.99</span></h2>
                                        <p className="d-none d-sm-block">Get your money's worth here</p>
                                    </div>
                            </div>
                            <div className="carousel-item ">
                                <img className="d-block img-fluid"
                                     src={image7}alt="dressnew7"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2>Computer Items<span className="badge badge-danger">New</span></h2>
                                        <p className="d-none d-sm-block">Only on our site</p>
                                    </div>
                            </div>
                            <div className="carousel-item ">
                                <img className="d-block img-fluid"
                                     src={image3} alt="dressnew4"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h2>Microphones</h2>
                                        <p className="d-none d-sm-block">Hugo Products Ltd.</p>
                                    </div>
                            </div>
                        </div>
                        <ol className="carousel-indicators">
                            <li data-target="#mycarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#mycarousel" data-slide-to="1"></li>
                            <li data-target="#mycarousel" data-slide-to="2"></li>
                        </ol>
                        <a className="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                        <button className="btn btn-danger btn-sm" id="carouselButton">
                            <span className="fa fa-pause"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
}


export default (Dashboard);