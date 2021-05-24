import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import 'date-fns';
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import ReplyModal from "../Components/ReplyModal";
import Box from "@material-ui/core/Box";
import ToastMessage from "../Components/ToastMessage";
import "../Components/AlertStyles.css";
import Form from "react-bootstrap/Form";
import FormControl from "@material-ui/core/FormControl";
import ArrowIcon from '@material-ui/icons/ArrowUpward';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from '@material-ui/core/LinearProgress';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import Axios from "axios";


class AdminFeedback extends Component {


    constructor(props) {
        super(props);

        this.state = {
            feedbackList: [],
            checkedFromBegin: false,
            checkedToEnd: false,
            showModale: false,
            showToast: false,
            toastMessage: '',
            toastType: '',
            typeColor: '',
            dateRange: {
                startDate: new Date(),
                endDate: new Date()
            },
            loading: true

        }


    }

    componentDidMount() {
        this.fetchData();

        window.addEventListener('scroll', this.scrollFunction);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunction);
    }

    labels = {
        1: 'Useless',
        2: 'Very Bad',
        3: 'Poor',
        4: 'Okay',
        5: 'Not Bad',
        6: 'Good',
        7: 'Excellent',
    };

    setShow = (val) => {
        this.setState({
            showToast: val
        })
    }

    fetchData = () => {

        Axios.get(`${SERVER_ADDRESS}/api/feedback/`)
            .then(res => {

                if (res.status === 200) {
                    this.setState({
                        feedbackList: res.data,
                        loading: false
                    }, () => {

                        let sortedList = this.state.feedbackList;

                        sortedList.sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt)
                        })

                        this.setState({
                            feedbackList: sortedList
                        })
                    });
                } else {
                    this.setState({
                        showToast: true,
                        toastMessage: "Unexpected Issue Occurred...",
                        toastType: 'Error',
                        typeColor: "error"
                    });

                    setTimeout(() => {
                        this.setState({
                            showToast: false
                        })
                    }, 5000);
                }

            }).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });

            setTimeout(() => {
                this.setState({
                    showToast: false
                })
            }, 5000);
        });
    }

    useStyles = () => makeStyles((theme) => ({
        root: {
            width: "auto",
            display: 'flex',
            alignItems: 'center',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        }
    }));

    scrollFunction() {

        let myButton = document.getElementById("myBtn");

        if (myButton !== undefined) {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                myButton.style.display = 'block';
            } else {
                myButton.style.display = 'none';
            }
        }

    }

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    onReplySubmit = (event, obj) => {

        event.preventDefault();
        console.log(obj.newFeedback)
        Axios.put(`${SERVER_ADDRESS}/api/feedback/${obj.newFeedback._id}`, obj.newFeedback)
            .then((r) => {

                if (r.status === 200) {
                    this.setState({
                        showToast: true,
                        toastMessage: 'Replied to the Feedback!!!',
                        toastType: 'Information',
                        typeColor: "success"
                    })

                    this.fetchData();
                } else {
                    this.setState({
                        showToast: true,
                        toastMessage: "Unexpected Response Status " + r.status + " Occurred...",
                        toastType: 'Error',
                        typeColor: "warning"
                    });
                }


            }).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });
        });

        setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, 5000);
    }

    searchFeedback(event) {

        event.preventDefault();

        let startDate = this.state.dateRange.startDate;
        let endDate = this.state.dateRange.endDate;

        if (this.state.checkedFromBegin) {
            startDate = new Date('1970-01-01T00:00');
        }

        if (this.state.checkedToEnd) {
            endDate = new Date();
        }

        Axios.get(`${SERVER_ADDRESS}/api/feedback/search/${startDate}/${endDate}`)
            .then(response => {

                if (response.status === 200) {
                    this.setState({
                        feedbackList: response.data
                    }, () => {

                        this.setState({
                            showModale: false
                        }, () => {

                            let sortedList = this.state.feedbackList;

                            sortedList.sort((a, b) => {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })

                            this.setState({
                                feedbackList: sortedList
                            })

                            if (this.state.feedbackList.length > 0) {
                                this.setState({
                                    showToast: true,
                                    toastMessage: 'Results Found!!!',
                                    toastType: 'Information',
                                    typeColor: "success",
                                    checkedFromBegin: false,
                                    checkedToEnd: false
                                })


                            } else {

                                this.fetchData();

                                this.setState({
                                    showToast: true,
                                    toastMessage: 'No Results!!!',
                                    toastType: 'Information',
                                    typeColor: "info",
                                    checkedFromBegin: false,
                                    checkedToEnd: false,
                                })
                            }
                        })

                        document.getElementById('start datetime-local').value = "";
                        document.getElementById('end datetime-local').value = "";


                    })
                } else {
                    this.setState({
                        showToast: true,
                        toastMessage: "Unexpected Issue Occurred...",
                        toastType: 'Error',
                        typeColor: "error"
                    });
                }

            }).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });
        });

        setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, 5000);

    }

    render() {
        const classes = this.useStyles();

        const feedbackList = this.state.feedbackList;

        const handleChange = (event) => {

            switch (event.target.id) {
                case "checkBegin":
                    this.setState({checkedFromBegin: event.target.checked});
                    break;
                case "checkEnd":
                    this.setState({checkedToEnd: event.target.checked});
                    break;
                default:
                    break;

            }

        };

        return (

            <>

                <Fab color="secondary" id="myBtn" aria-label="add" onClick={() => this.topFunction()}>
                    <ArrowIcon/>
                </Fab>

                <div className="fixed-bottom w-100" id="toastMessageAdmin">
                    <ToastMessage tId={"admin"} showFunction={this.setShow} showToast={this.state.showToast}
                                  message={this.state.toastMessage} messageType={this.state.toastType}
                                  statusColor={this.state.typeColor}/>
                </div>

                <div className="m-xl-5">
                    <Form onSubmit={(event) => this.searchFeedback(event)}>
                        <CardGroup>

                            <Card>
                                <Card.Title className="m-xl-5">Search&nbsp;by&nbsp;Date/Time&nbsp;Range</Card.Title>
                            </Card>
                            <Card>
                                <div className="ml-xl-5 mr-xl-5 mt-xl-3 mb-xl-3">
                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox id="checkBegin"
                                                          checked={this.state.checkedFromBegin}
                                                          onChange={handleChange}

                                                          color="primary"
                                                />
                                            }
                                            label="From Earliest"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        {this.state.checkedFromBegin !== true ?

                                            <TextField
                                                id="start datetime-local"
                                                label="Start Date/Time"
                                                type="datetime-local"
                                                required
                                                onChange={(event) => this.setState({
                                                    dateRange: {
                                                        startDate: event.target.value,
                                                        endDate: this.state.dateRange.endDate
                                                    }

                                                }, () => {
                                                    console.log(this.state.dateRange.startDate.toString())
                                                })}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                            :

                                            <TextField
                                                id="start datetime-local"
                                                label="Start Date/Time"
                                                type="datetime-local"
                                                disabled
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        }
                                    </FormControl>
                                </div>

                            </Card>
                            <Card>

                                <div className="ml-xl-5 mr-xl-5 mt-xl-3 mb-xl-3">
                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox id="checkEnd"
                                                          checked={this.state.checkedToEnd}
                                                          onChange={handleChange}

                                                          color="primary"
                                                />
                                            }
                                            label="Till Most Recent"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        {this.state.checkedToEnd !== true ?

                                            <TextField
                                                id="end datetime-local"
                                                label="End Date/Time"
                                                type="datetime-local"
                                                required
                                                onChange={(event) => this.setState({
                                                    dateRange: {
                                                        startDate: this.state.dateRange.startDate,
                                                        endDate: event.target.value
                                                    }
                                                }, () => {
                                                    console.log(this.state.dateRange.endDate.toString())
                                                })}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                            :

                                            <TextField
                                                id="end datetime-local"
                                                label="End Date/Time"
                                                type="datetime-local"
                                                disabled
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        }
                                    </FormControl>
                                </div>


                            </Card>
                            <Card>
                                <div className="ml-xl-5 mr-xl-5">
                                    <Button className="btn btn-block" variant="secondary" type="button"
                                            onClick={() => this.fetchData()}>Refresh</Button>
                                    <Button className="btn btn-block" variant="primary" type="submit">Search</Button>
                                </div>

                            </Card>
                        </CardGroup>

                    </Form>
                </div>

                <hr/>

                {
                    this.state.loading ? <LinearProgress color="secondary"/> :

                        feedbackList.map((feedback, index) => (
                            <div key={index}>
                                <div className="mr-xl-5 ml-xl-5">
                                    <Card>
                                        <Card.Header>
                                            <div className="float-left">
                                                {feedback.name}
                                            </div>
                                            <div className="float-right">
                                                {feedback.email}
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="float-left w-75">

                                                <Card.Title>{feedback.comment}</Card.Title>

                                                <div className={classes.root}>
                                                    <Rating
                                                        size="large"
                                                        max={7}
                                                        name="read-only size-large"
                                                        value={feedback.rating}
                                                        precision={1}
                                                        readOnly
                                                    />
                                                    <Box ml={0.5}
                                                         className="text-muted">{this.labels[feedback.rating]}</Box>
                                                </div>
                                                <hr/>
                                                {
                                                    feedback.reply !== "" ?
                                                        <div>
                                                            <Card.Subtitle>Reply</Card.Subtitle>
                                                            <Card.Text>{feedback.reply}</Card.Text>
                                                        </div> : <></>
                                                }
                                            </div>
                                            <div className="float-right flex-row w-25 text-center">
                                                <ReplyModal onReplySubmit={this.onReplySubmit} feedbackObj={feedback}/>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="float-left">
                                                Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                            </div>
                                            {
                                                feedback.reply !== "" ?
                                                    <div className="float-right">
                                                        Replied&nbsp;on&nbsp;{new Date(feedback.updatedAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.updatedAt).toLocaleTimeString()}
                                                    </div> : <></>
                                            }
                                        </Card.Footer>
                                    </Card>
                                </div>
                                <hr/>
                            </div>
                        ))
                }
            </>
        );
    }
}
export default (AdminFeedback);

