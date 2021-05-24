import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './AlertStyles.css';


class ConfirmDeleteFeedbackModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            feedbackId: undefined,
            show: false,
        }


    }


    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState !== nextProps) {
            return ({
                feedbackId: nextProps.feedbackId
            });
        }

        return null;

    }


    handleClose = () => {
        this.setState({
            show: false
        });
    };
    handleShow = () => {
        this.setState({
            show: true
        });
    };


    render() {
        return (
            <>


                <Button variant="outline-danger"
                        type="button" onClick={() => this.handleShow()}>
                    <i className="fas fa-trash-alt"/>
                </Button>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm&nbsp;Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <p>Are you sure you want to delete the feedback?</p>


                    </Modal.Body>
                    <Modal.Footer>
                        <div className="float-right">
                            <Button variant="secondary" onClick={this.handleClose}>
                                No
                            </Button>
                            <Button variant="primary" type="button"
                                    onClick={() => {
                                        this.handleClose();
                                        this.props.onDeleteFeedback(this.state.feedbackId);
                                    }}>
                                Yes
                            </Button>
                        </div>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }


}

export default ConfirmDeleteFeedbackModal;