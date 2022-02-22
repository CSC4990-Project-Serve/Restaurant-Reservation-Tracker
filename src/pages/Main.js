import React from 'react';

const Main = () => {
    return (
        <div>
            <nav className="navbarHeader navbar-light bg-light">
                <span className="navbar-brand mb-0 h1" style="color:blue">Project Serve</span>
            </nav>
            <div className="navbarBelow bg-light">
                <div className="row">
                    <div className="col linkLeft">
                        <a className="home" id="home" href="#">Home <span className="sr-only">(current)</span></a>
                    </div>
                    <div className="col linkRight">
                        <a className="login" id="login" href="#">Login/Logout</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <img className="imgBanner" src="../../public/imgs/table.jpg" alt={}/>
            </div>
            <form className="search-area">
                <div className="htmlForm-group">
                    <div className="row">
                        <div className="col-10">
                            <div className="row">
                                <label htmlFor="searchName">Restaurant Name:</label>
                                <input className="form-control" id="searchName" placeholder="Enter Restaurant Name"/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="searchDay">Day:</label>
                                    <input className="form-control" id="searchDay" placeholder="11/11/11"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="searchTime">Time:</label>
                                    <input className="form-control" id="searchTime" placeholder="24:00"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="searchSeats">Seats:</label>
                                    <input className="form-control" id="searchSeats" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 text-center searchButton">
                            <button type="submit" className="btn btn-primary button-spaced">Search</button>
                        </div>
                    </div>
                </div>
            </form>
            <div style="overflow-x:auto;">
                <table>
                    <tr>
                        <td>this is where</td>
                        <td>the search results</td>
                        <td>and recommended will</td>
                        <td>be displayed.</td>
                        <td>Recommendatiosn will display</td>
                        <td>initially, then be replaced </td>
                        <td>once search is queried</td>
                        <td>999999999999999999999999999999999999999999999999999999999999999</td>
                        <td>999999999 9999999999999 99999999999999 99999999999999 9999999 999999</td>
                        <td>999999999 9999999999999 99999999999999 99999999999999 9999999 999999</td>
                        <td>999999999 9999999999999 99999999999999 99999999999999 9999999 999999</td>
                        <td>999999999 9999999999999 99999999999999 99999999999999 9999999 999999</td>
                        <td>999999999 9999999999999 99999999999999 99999999999999 9999999 999999</td>
                        <td>test</td>
                    </tr>
                </table>
            </div>
            <footer className="page-footer font-small blue bg-light">
                <div className="footer-copyright text-center py-3">© 2022 Copyright:
                    <a href=""> The Coding Connoisseurs</a>
                </div>
            </footer>
        </div>
    );
};

export default Main;