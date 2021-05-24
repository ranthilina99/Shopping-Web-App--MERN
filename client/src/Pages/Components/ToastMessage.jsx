import React, {Component} from "react";
import "./AlertStyles.css";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AlertTitle from "@material-ui/lab/AlertTitle";


class ToastMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            message: '',
            messageType: 'Error',
            statusColor: 'error'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps !== prevState) {

            return ({
                show: nextProps.showToast,
                message: nextProps.message,
                messageType: nextProps.messageType,
                statusColor: nextProps.statusColor
            });
        }

        return null;
    }

    useStyles = () => makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));


    render() {

        const classes = this.useStyles();

        if (this.state.show) {



                return (

                    <div className={classes.root} id={this.props.tId}>
                        <Alert onClose={() => {
                            this.props.showFunction(false)
                        }} severity={`${this.state.statusColor}`}>
                            <AlertTitle>{this.state.messageType}</AlertTitle>
                            <p>{this.state.message}</p>
                        </Alert>
                    </div>

                );


        }

        return (<></>);


    }


}

export default ToastMessage;