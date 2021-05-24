import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import RegisterSM from "./Add-Seller.component";
import Navbar from "./NavgationBar.Component";
import ItemList from "./ItemList.Component";
import EditItem from "./EditItem.Component";
import CreateItem from "./CreateItem.Component";
import CreateCategory from "./CreateItemCategory.Component";
import Logout from "./AdminLogout";
import CusFeedback from "./AdminFeedback";
import SMPage from "./SellerPage";

function App() {

    if (localStorage.getItem('token')) {

        if (localStorage.getItem('userType')) {
            return <Redirect to={"/"}/>;
        } else {
            return (
                <>

                    <Router>
                        <div className="" style={{background: "white"}}>
                            <Navbar/>

                            <div>
                                <div style={{padding: "20px"}}>
                                    <Route path="/admin" exact component={ItemList}/>
                                </div>

                                <div className="container" style={{border: "solid lightgrey 1px"}}>
                                    <Route path="/edit/:id" component={EditItem}/>
                                    <Route path="/product" component={CreateItem}/>
                                    <Route path="/category" component={CreateCategory}/>
                                    <Route path="/sm_pages" component={SMPage}/>
                                    {localStorage.getItem("admin") ?
                                        <Route path="/sm_register" component={RegisterSM}/> : <></>}

                                    <Route path="/logout" component={Logout}/>
                                </div>
                                <div>
                                    <Route path="/cusFeedback" component={CusFeedback}/>
                                </div>

                            </div>
                        </div>
                    </Router>
                    }
                </>
            );

        }
    } else {
        return <Redirect to={"/"}/>;
    }


}

export default App;
