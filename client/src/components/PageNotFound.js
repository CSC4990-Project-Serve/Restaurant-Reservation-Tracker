import {useNavigate} from "react-router";
import {Button, Container} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/PageNotFound.css';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const PageNotFound= () =>{
    const navigate = useNavigate();

    return (
        <>
            <NavigationBar />

            <Container className="error-container">
                <MDBIcon icon="exclamation-circle fa-10x" />
                <h1>Page Not Found</h1>
                <Button type="button" className="error-button" onClick={() => navigate("/")}>Go home</Button>
            </Container>

            <Footer/>
        </>
    )
}

export default PageNotFound;