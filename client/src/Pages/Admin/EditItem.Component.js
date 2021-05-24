import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import FileBase64 from "react-file-base64";
import {SERVER_ADDRESS} from "../../Constants/Constants";

export default class EditItem extends Component {
    constructor(props) {
        super(props);

        this.onChangePName = this.onChangePName.bind(this);
        this.onChangePDescription = this.onChangePDescription.bind(this);
        this.onChangePCategory = this.onChangePCategory.bind(this);
        this.onChangePBrand = this.onChangePBrand.bind(this);
        this.onChangePAmount = this.onChangePAmount.bind(this);
        this.onChangePPrice = this.onChangePPrice.bind(this);
        this.onChangePDiscount = this.onChangePDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            PName : "",
            PDescription : "",
            PCategory : "",
            PBrand : "",
            PAmount : 0,
            PPrice : 0,
            PDiscount: 0,
            PImage : "",
            Category : [],
            baseImage: ""
        }


    }


    componentDidMount() {
        axios.get(SERVER_ADDRESS + "/product/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    PName : response.data.PName,
                    PDescription : response.data.PDescription,
                    PCategory : response.data.PCategory,
                    PBrand : response.data.PBrand,
                    PAmount : response.data.PAmount,
                    PPrice : response.data.PPrice,
                    PDiscount : response.data.PDiscount,
                    PImage : response.data.PImage
                })
            })
            .catch((error)=>{
                console.log(error);
            })


        axios.get(SERVER_ADDRESS + "/category/")
            .then(response => {
                if (response.data.length >0){
                    this.setState({
                        Category: response.data.map(category => category.cname),
                        PCategory: response.data[0].cname
                    });
                }
            })


    }

    onChangePName(e){
        this.setState({
            PName: e.target.value
        });
    }

    onChangePDescription(e){
        this.setState({
            PDescription: e.target.value
        });
    }

    onChangePCategory(e){
        this.setState({
            PCategory: e.target.value
        });
    }

    onChangePBrand(e){
        this.setState({
            PBrand: e.target.value
        });
    }

    onChangePAmount(e){
        this.setState({
            PAmount: e.target.value
        });
    }

    onChangePPrice(e){
        this.setState({
            PPrice: e.target.value
        });
    }

    onChangePDiscount(e){
        this.setState({
            PDiscount: e.target.value
        });
    }

    getFiles(files){
        this.setState({
            PImage: files.base64.toString()
        });
    }

    ProductSavedAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item updated successfully',
            showConfirmButton: false,
            timer: 3000
        })
    }

    onSubmit(e){
        e.preventDefault();

        const product = {
            PName : this.state.PName,
            PDescription : this.state.PDescription,
            PCategory : this.state.PCategory,
            PBrand : this.state.PBrand,
            PAmount : this.state.PAmount,
            PPrice : this.state.PPrice,
            PDiscount : this.state.PDiscount,
            PImage : this.state.PImage
        };

        console.log(product);

        axios.post(SERVER_ADDRESS + "/product/update/" + this.props.match.params.id, product)
            .then(res =>{
                console.log(res.data);
                this.ProductSavedAlert();
            });

    }

    render() {

        return (
            <div>
                <h3>Update Item</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label>Item Category: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.PCategory}
                            onChange={this.onChangePCategory}>
                            {
                                this.state.Category.map(function (category) {
                                    return <option
                                        key={category}
                                        value={category}>{category}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Item Name: </label>
                        <input type="text"  className="form-control"
                               value={this.state.PName}
                               onChange={this.onChangePName}/>
                    </div>

                    <div className="form-group">
                        <label>Item Description: </label>
                        <input type="text"  className="form-control"
                               value={this.state.PDescription}
                               onChange={this.onChangePDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Item Brand: </label>
                        <input type="text"  className="form-control"
                               value={this.state.PBrand}
                               onChange={this.onChangePBrand}/>
                    </div>

                    <div className="form-group">
                        <label>Item Amount: </label>
                        <input type="text" className="form-control"
                               value={this.state.PAmount}
                               onChange={this.onChangePAmount}/>
                    </div>

                    <div className="form-group">
                        <label>Item Price (.Rs): </label>
                        <input type="text"  className="form-control"
                               value={this.state.PPrice}
                               onChange={this.onChangePPrice}/>

                    </div>

                    <div className="form-group">
                        <label>Item Discount (%): </label>
                        <input type="text"  className="form-control"
                               value={this.state.PDiscount}
                               onChange={this.onChangePDiscount}/>
                        <h5>Sale Price : Rs.{this.state.PPrice - (this.state.PDiscount*this.state.PPrice)/100  }/=</h5>
                    </div>

                    <div className="process">
                        <FileBase64
                            multiple={ false }
                            onDone={ this.getFiles.bind(this) } />
                    </div>
                    <div className="text-center">
                        <img className="img1" src={this.state.PImage} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Item" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        );
    }
}
