import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import LinearProgress from '@material-ui/core/LinearProgress';
import {SERVER_ADDRESS} from "../../Constants/Constants";


const Product = props =>(
    <tr>
        <td ><img width={200} src={props.product.PImage}/></td>
        <td>{props.product.PName}</td>
        <td>{props.product.PDescription}</td>
        <td>{props.product.PBrand}</td>
        <td>{props.product.PAmount}</td>
        <td>{props.product.PPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'LKR'
        })}</td>
        <td>{props.product.PDiscount}</td>
        <td>{props.product.updatedAt.toLocaleString()}</td>
        <td width={180}>
           <Link to={"/edit/"+props.product._id}><button className="btn-primary">Update</button></Link>  <button className="btn-danger" onClick={() => {props.deleteProduct(props.product._id)}}>Delete</button>
        </td>
    </tr>
);


export default class ItemList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state ={
            product :[],
            loading: true
        };
    }

    componentDidMount() {

        axios.get(SERVER_ADDRESS + "/product/")
            .then(response => {
                this.setState({
                    product : response.data,
                    loading :false
                })
            })
            .catch((error)=>{
              console.log(error);
            })
    }

    deleteProduct(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                //delete product
                axios.delete(SERVER_ADDRESS + "/product/" + id)
                    .then(res=>{
                        console.log(res.data);
                        this.setState({
                            product: this.state.product.filter(el => el._id !== id)
                        })
                        Swal.fire(
                            'Deleted!',
                            'Product has been deleted.',
                            'success'
                        )
                    })

            }
        })
    }

    productList(){
        return this.state.product.map(currentproduct =>{
            return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>
        })
    }

    render() {
        return (
            <div>
                <h1>Products Table</h1><br/>
                {this.state.loading ? <LinearProgress color="secondary"/> :
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Brand</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.productList()}
                        </tbody>
                    </table>

                }
            </div>

        );
    }
}
