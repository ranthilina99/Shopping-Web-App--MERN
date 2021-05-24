import React from "react";
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import LogedinHeader from "./HeaderLogin";
import Footer from "./footer";

const ContactUs = () => {
    return (
        <>
            <LogedinHeader/>
            <Container>
                <Card>
                    <Card.Header><h1>About&nbsp;Us</h1></Card.Header>
                    <Card.Body>
                        <Card.Text><h6>Our Team Members</h6></Card.Text>
                        <ul>
                            <li>IT19101620&nbsp;&nbsp;&nbsp;&nbsp;Salika Madhushanka W.J</li>
                            <li>IT19129372&nbsp;&nbsp;&nbsp;&nbsp;H.H.W.M.Binuka Sihan Paranagama</li>
                            <li>IT19240152&nbsp;&nbsp;&nbsp;&nbsp;Umesh Ranthilina K.M</li>
                            <li>IT19117256&nbsp;&nbsp;&nbsp;&nbsp;P.Y.D Jayasinghe</li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <p>
                            This DS Project is done by 3rd Year 1st Semester Students
                        </p>
                    </Card.Footer>
                </Card>
            </Container>
            <Footer/>

        </>
    );
}


export default (ContactUs);