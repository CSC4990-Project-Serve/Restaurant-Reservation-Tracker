import {Button, Form, Modal} from "react-bootstrap";
import '../css/Modal.css';

const ReservationModal = (props) => {
    function DoEmailStuff() {
        console.log("Email sent")
    }

    return (
        <Modal
            {...props}
            size="md"
            centered
        >
            <Modal.Header>
                <Modal.Title>Reservation Complete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>We look forward to seeing you!</p>
                <Form>
                    <Form.Label>Sign up for email reminders</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Button variant="dark" type="submit" onClick={DoEmailStuff}>Subscribe</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReservationModal;