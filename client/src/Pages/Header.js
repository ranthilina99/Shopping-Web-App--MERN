import React, {useEffect, useState} from "react";
import '../CSS/Header.css';
import logo from '../Images/logo.png';
import axios from "axios";
import {Link} from "react-router-dom";
import {SERVER_ADDRESS} from "../Constants/Constants";


const Header = () => {

    const [posts, setPosts] = useState([]);

    const doSom  = ()=>{
        axios.get(SERVER_ADDRESS + "/category/")
            .then(response => {
                    setPosts(response.data);
            })
    }

        useEffect(() => {
            console.log("post:"+posts);
        }, [posts])




    return (

        <div className="container-parent2">

                <div className="container-child">
                    <img className="Mainlogo" src={logo}
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
                                <a className="nav-link dropdown-toggle" onClick={doSom} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>

                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {posts.map((post,index) =>
                                    <Link key={index} to={"/allProduct/"+post.cname}  className="dropdown-item">{post.cname}</Link>
                                )}

                                </div>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="/feedback">Feedback</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/contact-us">About-us <span
                                    className="sr-only">(current)</span></a>
                            </li>



                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <a className="login-user-anchor" href="/login">Login User</a>
                            </button>

                        </form>
                    </div>
                </nav>
            </div>

        </div>

    );
}


export default (Header);