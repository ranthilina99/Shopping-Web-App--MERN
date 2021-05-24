import React, {Component} from 'react';
import axios from "axios";
import "../Components/nav.css";
import Swal from "sweetalert2";
import {SERVER_ADDRESS} from "../../Constants/Constants";

export default class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeCName = this.onChangeCName.bind(this);
        this.onChangeCDescription = this.onChangeCDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteCat = this.onDeleteCat.bind(this);
        this.onUpdateCat = this.onUpdateCat.bind(this);
        this.updateCategory = this.updateCategory.bind(this);

        this.state = {
            category: [],
            cname: "",
            cdescription: "",
            selectCategory: []
        }
    }

    onChangeCName(e) {
        this.setState({
            cname: e.target.value
        });
    }

    onChangeCDescription(e) {
        this.setState({
            cdescription: e.target.value
        });
    }

    componentDidMount() {
        // this.interval = setTimeout(this.getData)
        this.getData();
    }

    getData = () => {
        axios.get(SERVER_ADDRESS + "/category/")
            .then(response => {
                this.setState({
                    category: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    confirmAlart() {
        Swal.fire(
            'Good job!',
            'New category has created!',
            'success'
        )
    }

    CatSavedAlert() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ItemCategory updated successfully',
            showConfirmButton: false,
            timer: 3000
        })
    }

    fieldmissAlart() {
        Swal.fire({
            icon: 'question',
            title: 'Oppss! something missing',
            text: 'Please select a category from the list'
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const category = {
            cname: this.state.cname,
            cdescription: this.state.cdescription,
        }

        console.log(category);

        axios.post(SERVER_ADDRESS + '/category/add', category)
            .then(res => {
                    console.log(res.data);

                    this.getData();

                    this.setState({
                        cname: "",
                        cdescription: ""
                    });

                    this.confirmAlart();
                }
            );

    }

    onDeleteCat(id) {

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

                //delete category
                axios.delete(SERVER_ADDRESS + "/category/" + id)
                    .then(res => {
                            console.log(res.data)
                            this.setState({
                                category: this.state.category.filter(del => del._id !== id)
                            })
                            Swal.fire(
                                'Deleted!',
                                'ItemCategory has been deleted.',
                                'success'
                            )

                        }
                    );

            }
        })

    }


    onUpdateCat(data) {
        console.log("event:" + data.cname);

        this.setState({
            cname: data.cname,
            cdescription: data.cdescription,
            selectCategory: data
        })
    }

    updateCategory(e) {
        console.log("update event:" + e);
        if (this.state.cname !== "" || this.state.cdescription !== "") {
            e.preventDefault();
            const category = {
                cname: this.state.cname,
                cdescription: this.state.cdescription,
            }

            axios.post(SERVER_ADDRESS + "/category/update/" + this.state.selectCategory._id, category)
                .then(res => {
                    console.log(res);
                    this.getData();

                    this.setState({
                        cname: "",
                        cdescription: ""
                    })

                    this.CatSavedAlert();
                });
        } else {
            this.fieldmissAlart();
        }


    }

    render() {
        return (
            <div>
                <br/>
                <h1>Create Main ItemCategory</h1><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>ItemCategory Name: </label>
                        <input type="text" required className="form-control"
                               value={this.state.cname}
                               onChange={this.onChangeCName}/>
                    </div>

                    <div className="form-group">
                        <label>ItemCategory Description: </label>
                        <textarea type="text" required className="form-control"
                                  value={this.state.cdescription}
                                  onChange={this.onChangeCDescription}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add ItemCategory" className="btn btn-primary"/>
                        <button onClick={this.updateCategory} className="btn btn-primary">Update ItemCategory</button>

                    </div>
                </form>


                <h1>ItemCategory Table</h1><br/>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>ItemCategory Name</th>
                        <th>ItemCategory Description</th>
                        <th width={200}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.category.map((data, i) => (
                        <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{data.cname}</th>
                            <th>{data.cdescription}</th>
                            <th width={100}>
                                <button style={{margin: "3px"}} className="btn-primary"
                                        onClick={() => this.onUpdateCat(data)}>Update
                                </button>
                                <button className="btn-danger" onClick={() => this.onDeleteCat(data._id)}>Delete
                                </button>
                            </th>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}

