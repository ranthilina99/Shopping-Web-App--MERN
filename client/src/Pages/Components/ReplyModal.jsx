import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


class ReplyModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            feedback: {},
            show: false,
            newFeedback: {
                _id: undefined,
                name: "",
                email: "",
                rating: 0,
                comment: "",
                reply: ""
            }
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.feedbackObj !== prevState.feedback) {
            return ({
                feedback: nextProps.feedbackObj
            });
        }

        return null;
    }


    handleClose = () => this.setState({
        show: false,
        feedback: this.props.feedbackObj,
        newFeedback: {
            _id: undefined,
            name: "",
            email: "",
            rating: 0,
            comment: "",
            reply: ""
        }
    });
    handleShow = () => this.setState({
        show: true
    });

    onChangeText(event) {
        this.setState({
            newFeedback: {
                _id: this.state.feedback._id,
                name: this.state.feedback.name,
                email: this.state.feedback.email,
                rating: this.state.feedback.rating,
                comment: this.state.feedback.comment,
                reply: event.target.value
            }
        }, () => {
            console.log(this.state.newFeedback.reply);
        });
    }


    render() {
        return (
            <>
                <Button variant="outline-primary" size="lg" onClick={this.handleShow}>
                    Reply<br/>
                    or<br/>
                    Edit&nbsp;Reply
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={(event) => {
                        this.setState({
                            show: false
                        });
                        this.props.onReplySubmit(event, this.state);
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reply&nbsp;to&nbsp;Feedback</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>Comment&nbsp;ID</Form.Label>
                                <Form.Control type="text"
                                              defaultValue={this.state.feedback._id} required readOnly/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Reply&nbsp;Comment</Form.Label>
                                <Form.Control as="textarea" rows="2" type="text"
                                              onChange={(event) => this.onChangeText(event)}
                                              defaultValue={this.state.feedback.reply}
                                              placeholder="Enter your Reply here.."
                                              required/>

                            </Form.Group>


                        </Modal.Body>
                        <Modal.Footer>
                            <div className="float-right">
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Submit&nbsp;Reply
                                </Button>
                            </div>

                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }


}

export default ReplyModal;