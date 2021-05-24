import React, {Component} from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import Swal from 'sweetalert2'
import {SERVER_ADDRESS} from "../../Constants/Constants";


export default class CreateItem extends Component {
    constructor(props) {
        super(props);

        this.onChangePName = this.onChangePName.bind(this);
        this.onChangePDescription = this.onChangePDescription.bind(this);
        this.onChangePCategory = this.onChangePCategory.bind(this);
        this.onChangePBrand = this.onChangePBrand.bind(this);
        this.onChangePAmount = this.onChangePAmount.bind(this);
        this.onChangePPrice = this.onChangePPrice.bind(this);
        //this.onChangePImage = this.onChangePImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
            PName: "",
            PDescription: "",
            PCategory: "",
            PBrand: "",
            PAmount: 0,
            PPrice: 0,
            PImage: "",
            Category: [],
            baseImage: "",
            open: false,
            sizeEx: false
        }

    }


    componentDidMount() {

        axios.get(SERVER_ADDRESS + "/category/")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Category: response.data.map(category => category.cname),
                        PCategory: response.data[0].cname
                    });
                }
            })
    }

    onChangePName(e) {
        this.setState({
            PName: e.target.value
        });
    }

    onChangePDescription(e) {
        this.setState({
            PDescription: e.target.value
        });
    }

    onChangePCategory(e) {
        this.setState({
            PCategory: e.target.value
        });
    }

    onChangePBrand(e) {
        this.setState({
            PBrand: e.target.value
        });
    }

    onChangePAmount(e) {
        this.setState({
            PAmount: e.target.value
        });
    }

    onChangePPrice(e) {
        this.setState({
            PPrice: e.target.value
        });
    }


    getFiles(files) {
        const fileSize = files.size.match(/\d+/)[0];
        console.log("size: " + fileSize);

        if (fileSize < 5000) {
            console.log("size ok");
            this.setState({
                PImage: files.base64.toString()
            });
        } else {
            this.setState({
                sizeEx: true
            })
            console.log("not ok" + this.state.sizeEx);
        }

    }

    confirmAlart() {
        Swal.fire(
            'Good job!',
            'New Item Successfully Added!',
            'success'
        )
    }

    filesizeAlart() {
        Swal.fire({
            icon: 'warning',
            title: 'Image is too large!',
            text: 'Please insert an image size less than 5mb'
        })
    }

    filemissAlart() {
        Swal.fire({
            icon: 'question',
            title: 'Oppss! something missing',
            text: 'Please insert the image!'
        })
    }

    onSubmit(e) {

        e.preventDefault();
        console.log("file size: " + this.state.sizeEx)
        if (this.state.sizeEx === true) {
            this.filesizeAlart();
            this.setState({
                sizeEx: false
            })
        } else {
            console.log("image :" + this.state.PImage)
            if (this.state.PImage !== "") {
                const product = {
                    PName: this.state.PName,
                    PDescription: this.state.PDescription,
                    PCategory: this.state.PCategory,
                    PBrand: this.state.PBrand,
                    PAmount: this.state.PAmount,
                    PPrice: this.state.PPrice,
                    PImage: this.state.PImage
                };

                console.log(product);

                axios.post(SERVER_ADDRESS + "/product/add", product)
                    .then(res => {
                        console.log(res.data);
                        this.confirmAlart();
                    });
            } else {
                this.filemissAlart();
            }

        }
    }

    render() {

        return (
            <div>
                <h1>Create New Item</h1><br/>
                <form onSubmit={this.onSubmit}>
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
                        <input type="text" required className="form-control"
                               value={this.state.PName}
                               onChange={this.onChangePName}/>
                    </div>

                    <div className="form-group">
                        <label>Item Description: </label>
                        <textarea type="text" required className="form-control "
                                  value={this.state.PDescription}
                                  onChange={this.onChangePDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Item Brand: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PBrand}
                               onChange={this.onChangePBrand}/>
                    </div>

                    <div className="form-group">
                        <label>Item Amount: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PAmount}
                               onChange={this.onChangePAmount}/>
                    </div>

                    <div className="form-group">
                        <label>Item Price: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PPrice}
                               onChange={this.onChangePPrice}/>
                    </div>

                    <div className="process">

                        <FileBase64
                            multiple={false}
                            onDone={this.getFiles.bind(this)}/>
                    </div>
                    <div className="text-center">
                        <img className={this.state.PImage ? "img1" : ""} src={this.state.PImage}/>

                    </div>


                    <div className="form-group">
                        <input type="submit" value="Add Item" className="btn btn-primary"/>
                    </div>

                </form>


            </div>
        );
    }
}
