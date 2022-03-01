import React from 'react';
import {NavLink} from "react-router-dom";
// import {
//     SomonaukCountryKitchen,
// } from "../components";

const Main = () => {
    return (
        <div>
            <div className="row">
                <img className="imgBanner" src={require("../imgs/table.jpg")} alt={""}/>
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
            <div className={"tableClass"}>
                <table>
                    <tbody>
                        <tr>
                            <td>this is where</td>
                            <td>the search results</td>
                            <td>and recommended will</td>
                            <td>be displayed.</td>
                            <td>
                                <NavLink to={"/SomonaukCountryKitchen"}>
                                    SomonaukCountryKitchen
                                </NavLink>
                            </td>
                            <td>initially, then be replaced</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Main;