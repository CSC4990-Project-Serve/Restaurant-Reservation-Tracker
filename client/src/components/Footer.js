import {MDBIcon} from 'mdb-react-ui-kit';
import '../css/Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer-distributed">

                <div className="footer-left">

                    <div className="company-about">
                        <div className="company-about-header">About Us</div>
                        <div className="company-about-info">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci distinctio eius eligendi, fugit illo inventore ipsam labore laudantium, minima placeat quidem veniam! Culpa dolore ex, in maiores nostrum ullam ut.
                        </div>

                    </div>

                    <div className="footer-icons">

                        <a href="#"><MDBIcon fab icon='facebook-f' /></a>
                        <a href="#"><MDBIcon fab icon='twitter' /></a>
                        <a href="#"><MDBIcon fab icon='google' /></a>
                        <a href="#"><MDBIcon fab icon='instagram' /></a>

                    </div>

                </div>

                <div className="footer-center">

                    <div className="link-header">Useful Links</div>

                    <div className="footer-links">
                        <div>
                            <a href="#">Contact Us</a>
                        </div>
                        <div>
                            <a href="#">Help</a>
                        </div>
                        <div>
                            <a href="#">Terms of Use</a>
                        </div>
                        <div>
                            <a href="#">Privacy Policy</a>
                        </div>
                    </div>

                </div>

                <div className="footer-right">

                    <h3>Project <span>Serve</span></h3>

                    <p className="footer-company-name">Coding Connoisseurs &copy;2022</p>

                </div>

            </footer>
        </>
    );
};

export default Footer;