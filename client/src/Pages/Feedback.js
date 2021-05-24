import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Box from "@material-ui/core/Box";
import {makeStyles} from '@material-ui/core/styles';
import Button from "react-bootstrap/Button";
import {SERVER_ADDRESS} from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToastMessage from "./Components/ToastMessage";
import LogedinHeader from "./HeaderLogin";
import Tabs from "react-bootstrap/Tabs";
import Rating from "@material-ui/lab/Rating";
import Tab from "react-bootstrap/Tab";
import "./Components/AlertStyles.css";
import Axios from "axios";
import Footer from "./footer";
import ConfirmDeleteFeedbackModal from "./Components/ConfirmDeleteFeedbackModal";

class Feedback extends Component {

    labels = {
        1: 'Useless',
        2: 'Very Bad',
        3: 'Poor',
        4: 'Okay',
        5: 'Not Bad',
        6: 'Good',
        7: 'Excellent',
    };

    constructor(props) {
        super(props);

        this.state = {
            feedback: {
                name: "",
                email: "",
                rating: 1,
                comment: "",
                reply: ""
            },
            allFeedbackList: [],
            feedbackList: [],
            hover: -1,
            showToast: false,
            toastMessage: '',
            toastType: 'Error',
            typeColor: 'error',
            key: 'home'
        }


    }

    componentDidMount() {
        this.fetchData();
    }

    setShow = (val) => {
        this.setState({
            showToast: val
        })
    }

    onDeleteFeedback = (id) => {

        Axios.delete(`${SERVER_ADDRESS}/api/feedback/delete/${id}`)
            .then((response) => {

            if (response.status === 200) {

                this.setState({
                    showToast: true,
                    toastMessage: 'Feedback Deleted Successfully!!!',
                    toastType: 'Information',
                    typeColor: "success"
                });

                this.fetchData();

            } else {

                this.setState({
                    showToast: true,
                    toastMessage: "Unexpected Response Status " + response.status + " Occurred...",
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


        setTimeout(() => this.setState({
            showToast: false
        }), 5000);
    }

    calculateAverageRating(feedbackList) {

        let nFeedbacks = feedbackList.length;
        let totalRating = 0;
        for (let i = 0; i < feedbackList.length; i++) {
            totalRating += feedbackList[i].rating
        }

        if (nFeedbacks > 0) {
            return totalRating / nFeedbacks;
        }
        return 0;


    }

    roundAverageRating(feedbackList) {
        return parseFloat(this.calculateAverageRating(feedbackList).toFixed(1));
    }


    setResponseErrorToast(response) {
        this.setState({
            showToast: true,
            toastMessage: "Unexpected Response Status " + response.status + " Occurred...",
            toastType: 'Error',
            typeColor: "warning"
        });
    }

    setErrorCatchToast() {
        this.setState({
            showToast: true,
            toastMessage: "Unexpected Issue Occurred...",
            toastType: 'Error',
            typeColor: "error"
        });
    }


    fetchData() {
        if (localStorage.getItem('userEmail')) {
            Axios.get(`${SERVER_ADDRESS}/api/feedback/user/${localStorage.getItem('userEmail')}`)
                .then(response => {

                    if (response.status === 200) {
                        this.setState({
                            feedbackList: response.data
                        }, () => {

                            let sortedList = this.state.feedbackList;

                            sortedList.sort((a, b) => {
                                return new Date(b.updatedAt) - new Date(a.updatedAt)
                            })

                            this.setState({
                                feedbackList: sortedList
                            })

                        })
                    } else {
                        this.setErrorCatchToast();

                        setTimeout(() => {
                            this.setState({
                                showToast: false
                            })
                        }, 5000);
                    }

                }).catch(() => {
                this.setErrorCatchToast();

                setTimeout(() => {
                    this.setState({
                        showToast: false
                    })
                }, 5000);


            });


        }


        Axios.get(`${SERVER_ADDRESS}/api/feedback/`)
            .then(response => {

                if (response.status === 200) {
                    this.setState({
                        allFeedbackList: response.data
                    }, () => {

                        let sortedList = this.state.allFeedbackList;

                        sortedList.sort((a, b) => {
                            return new Date(b.updatedAt) - new Date(a.updatedAt)
                        })

                        this.setState({
                            allFeedbackList: sortedList
                        })


                    })
                } else {
                    this.setErrorCatchToast();

                    setTimeout(() => {
                        this.setState({
                            showToast: false
                        })
                    }, 5000);
                }

            }).catch(() => {
            this.setErrorCatchToast();

            setTimeout(() => {
                this.setState({
                    showToast: false
                })
            }, 5000);


        });

        if (localStorage.getItem('userEmail') && localStorage.getItem('fullName')) {
            this.setState({
                feedback: {
                    name: localStorage.getItem('fullName'),
                    email: localStorage.getItem('userEmail'),
                    rating: 1,
                    comment: "",
                    reply: ""
                }
            });
        }


    }

    useStyles = () => makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center'
        },
    });

    classes = this.useStyles();

    HoverRating = () => {

        return (
            <div className={this.classes.root}>
                <Rating
                    size="large"
                    max={7}
                    name="hover-feedback size-large"
                    value={this.state.feedback.rating}
                    precision={1}
                    onChange={(event, newValue) => {
                        if (newValue <= 1) {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: 1,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            });
                        } else {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: newValue,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            })
                        }

                    }}
                    onChangeActive={(event, newHover) => {
                        this.setState({
                            hover: newHover
                        });
                    }}
                />
                <Box ml={0.5}
                     className="text-muted">{this.labels[this.state.hover !== -1 ? this.state.hover : this.state.feedback.rating]}</Box>
            </div>
        );
    }


    onChangeText = (event) => {
        switch (event.target.id) {

            case "name" :
                this.setState({
                    feedback: {
                        name: event.target.value,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "emailId":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: event.target.value,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "comment":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: event.target.value,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            default:
                break;

        }
    }

    onFeedbackPost = (event) => {
        event.preventDefault();

        console.log(this.state.feedback);

        Axios.post(`${SERVER_ADDRESS}/api/feedback/add`, this.state.feedback)
            .then((r) => {

            if (r.status === 200) {
                this.setState({

                    feedback: {
                        name: "",
                        email: "",
                        rating: 1,
                        comment: "",
                        reply: ""
                    },
                    showToast: true,
                    toastMessage: 'Feedback Posted Successfully!!!',
                    toastType: 'Information',
                    typeColor: "success"


                });
                document.getElementById('name').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('comment').value = '';
                this.fetchData();

            } else {
                this.setResponseErrorToast(r);

            }

        }).catch(() => {
            this.setErrorCatchToast();
        })

        setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, 5000);

    }

    render() {

        let feedbackList = this.state.feedbackList;
        let allFeedbackList = this.state.allFeedbackList;
        let average = this.calculateAverageRating(feedbackList);
        let roundRating = this.roundAverageRating(feedbackList);
        let overallAverage = this.calculateAverageRating(allFeedbackList);
        let roundOverallRating = this.roundAverageRating(allFeedbackList);

        return (
            <>
                <LogedinHeader/>
                <div>
                    <div className="fixed-top w-100" id="toastMessage">
                        <ToastMessage tId={"general"} showFunction={this.setShow} showToast={this.state.showToast}
                                      message={this.state.toastMessage} messageType={this.state.toastType}
                                      statusColor={this.state.typeColor}/>
                    </div>
                    <div style={{backgroundColor: "white"}}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.state.key}
                            style={{backgroundColor: "lightGrey"}}
                            onSelect={(k) => this.setState({key: k})}
                        >

                            <Tab eventKey="home" title="All Feedback from Users">
                                <Row>
                                    <Col xs={6} md={4}>
                                        <div className="ml-xl-5 pl-xl-5">
                                            <Row>
                                                <Col>

                                                    <Card>
                                                        <Card.Header as="h5">Overall&nbsp;Rating</Card.Header>
                                                        <Card.Body>

                                                            <div className={this.classes.root}
                                                                 style={{textAlign: "center"}}>

                                                                <strong
                                                                    style={{fontSize: "90px"}}>{overallAverage > 0 ? overallAverage.toFixed(2) : '0'}</strong><br/>
                                                                <Rating
                                                                    size="large"
                                                                    max={7}
                                                                    name="half-rating-read size-large"
                                                                    value={roundOverallRating}
                                                                    precision={0.1}
                                                                    readOnly
                                                                /><br/>
                                                                <p>Out&nbsp;of&nbsp;{allFeedbackList.length}</p>
                                                            </div>


                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>


                                    </Col>
                                    <Col xs={12} md={8}>
                                        <div className="pr-xl-5 mr-xl-5">

                                            <Row>
                                                <Col>

                                                    <Card style={{backgroundColor: "white"}}>
                                                        <Card.Header as="h5"
                                                                     id="feedbackHeader">Feedback&nbsp;from&nbsp;Users</Card.Header>
                                                    </Card>
                                                    <Card style={{backgroundColor: "lightGrey"}}
                                                          className="pt-0 overflow-auto" id="list">
                                                        <Card.Body>

                                                            <div>
                                                                {
                                                                    allFeedbackList.map((feedback, index) => (
                                                                        <div key={index}>
                                                                            <div className="mr-5">
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
                                                                                        <div className="float-left">

                                                                                            <Card.Title>{feedback.comment}</Card.Title>

                                                                                            <div
                                                                                                className={this.classes.root}>
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


                                                                                    </Card.Body>
                                                                                    <Card.Footer>
                                                                                        <div className="float-left">
                                                                                            Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                                                                        </div>
                                                                                        {
                                                                                            feedback.reply !== "" ?
                                                                                                <div
                                                                                                    className="float-right">
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
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            {localStorage.getItem('userEmail') ?
                                <Tab eventKey="profile" title="Your Feedback Management">
                                    <Row>
                                        <Col>
                                            <div className="ml-xl-5 pl-xl-5">
                                                <Card className="pt-0">
                                                    <Card.Header as="h5">Feedback</Card.Header>
                                                    <Card.Body>
                                                        <Form onSubmit={(event) => this.onFeedbackPost(event)}>
                                                            <Form.Group>
                                                                <Form.Label>Your&nbsp;Name</Form.Label>
                                                                {localStorage.getItem('fullName') ?
                                                                    <Form.Control id="name" readOnly
                                                                                  value={this.state.feedback.name}
                                                                                  type="text"
                                                                                  placeholder="Enter your Name here..."
                                                                                  required/> :
                                                                    <Form.Control id="name"
                                                                                  onChange={(event) => this.onChangeText(event)}
                                                                                  type="text"
                                                                                  placeholder="Enter your Name here..."
                                                                                  required/>
                                                                }

                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Email&nbsp;Address</Form.Label>
                                                                {localStorage.getItem('userEmail') ?
                                                                    <Form.Control id="emailId" type="email"
                                                                                  readOnly value={this.state.feedback.email}
                                                                                  placeholder="Enter your Email here.."
                                                                                  required/> :
                                                                    <Form.Control id="emailId" type="email"
                                                                                  onChange={(event) => this.onChangeText(event)}
                                                                                  placeholder="Enter your Email here.."
                                                                                  required/>
                                                                }

                                                                <Form.Text className="text-muted">
                                                                    We'll never share your email with anyone else.
                                                                </Form.Text>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Your&nbsp;Rating</Form.Label>
                                                                {this.HoverRating()}
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Comment</Form.Label>
                                                                <Form.Control id="comment" as="textarea" required rows="3"
                                                                              onChange={(event) => this.onChangeText(event)}
                                                                              placeholder="Add your Comment here..."/>
                                                            </Form.Group>

                                                            <Button variant="primary" type="submit" block>
                                                                Publish
                                                            </Button>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </div>


                                        </Col>
                                        <Col>
                                            <div className="pr-xl-5 mr-xl-5">
                                                <Row>
                                                    <Col>

                                                        <Card>
                                                            <Card.Header as="h5">Your&nbsp;Overall&nbsp;Rating&nbsp;:&nbsp;
                                                                <strong>{average > 0 ? average.toFixed(2) : 'No Rating'}</strong></Card.Header>
                                                            <Card.Body>

                                                                <div className={this.classes.root}>
                                                                    <Rating
                                                                        size="large"
                                                                        max={7}
                                                                        name="half-rating-read size-large"
                                                                        value={roundRating}
                                                                        precision={0.5}
                                                                        readOnly
                                                                    />
                                                                </div>

                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>

                                                        <Card style={{backgroundColor: "white"}}>
                                                            <Card.Header as="h5"
                                                                         id="feedbackHeader">Feedback&nbsp;from&nbsp;You</Card.Header>
                                                        </Card>
                                                        <Card style={{backgroundColor: "lightGrey"}}
                                                              className="pt-0 overflow-auto" id="list">
                                                            <Card.Body>

                                                                <div>
                                                                    {
                                                                        feedbackList.map((feedback, index) => (
                                                                            <div key={index}>
                                                                                <div className="mr-5">
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
                                                                                            <div className="float-left">

                                                                                                <Card.Title>{feedback.comment}</Card.Title>

                                                                                                <div
                                                                                                    className={this.classes.root}>
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
                                                                                            {localStorage.getItem('userEmail') ?
                                                                                                <div
                                                                                                    className="float-right">

                                                                                                    <ConfirmDeleteFeedbackModal
                                                                                                        onDeleteFeedback={this.onDeleteFeedback}
                                                                                                        feedbackId={feedback._id}/>
                                                                                                </div>
                                                                                                : <></>}


                                                                                        </Card.Body>
                                                                                        <Card.Footer>
                                                                                            <div className="float-left">
                                                                                                Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                                                                            </div>
                                                                                            {
                                                                                                feedback.reply !== "" ?
                                                                                                    <div
                                                                                                        className="float-right">
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
                                                                </div>
                                                            </Card.Body>
                                                        </Card>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>

                                : <></>}

                        </Tabs>
                    </div>
                    <Footer/>
                </div>


            </>
        );
    }


}


export default Feedback;