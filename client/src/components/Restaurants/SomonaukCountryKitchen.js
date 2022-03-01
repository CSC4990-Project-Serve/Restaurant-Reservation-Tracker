//https://www.countrykitchensomonauk.com/

import React from 'react';

const SomonaukCountryKitchen = () => {
    return (
        <div>
            <nav className="navbarHeader navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Somonauk Country Kitchen</span>
            </nav>
            <div className="row">
                <div className="col infoArea">
                    <div className="row d-flex justify-content-center">
                        <h2>Menu</h2>
                    </div>
                    <div className="row">
                        <ul className="menuList">
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                        </ul>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <h2>About This Restaurant</h2>
                    </div>
                    <div className="row descriptionArea">
                        <div id="descriptionArea">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi delectus dolor
                                dolorem dolores facere itaque obcaecati praesentium ullam? Aperiam beatae consequuntur
                                cum cupiditate delectus deleniti dolor dolore, dolorum error facere impedit ipsum
                                laudantium maiores molestias necessitatibus nesciunt officia omnis optio perspiciatis
                                quaerat quis reiciendis repellendus sit ut voluptate! Earum expedita fuga impedit nemo
                                nihil. Delectus eaque fuga id rerum veritatis voluptates! Ab, animi architecto
                                aspernatur assumenda distinctio, eligendi fugiat in iure minus modi molestiae quaerat,
                                quos recusandae reiciendis sequi soluta unde! Distinctio laudantium pariatur voluptate.
                                Amet autem excepturi id porro quas quibusdam sint suscipit veniam! Aut dolor fugiat
                                qui!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ducimus fugit
                                laboriosam perferendis quaerat quod repellat sapiente temporibus voluptatibus!
                                Accusantium consequatur illo minima praesentium ut? Cupiditate dolore enim
                                exercitationem non quam. Ipsam, possimus, velit? Ex, optio, quos. Consequuntur
                                cupiditate expedita facere fugit itaque, laudantium numquam porro quaerat, quia ullam
                                vero.</p>
                        </div>
                    </div>
                </div>
                <div className="col reservationArea">
                    <h2 className="text-center">Select a date to see if seats are available</h2>
                    <form>
                        <div className="row resInputSpot">
                            <div className="col text-center">
                                <button type="submit" className="btn btn-primary button-spaced">Reserve</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <label htmlFor="resDay">Day:</label>
                                <input className="form-control" id="resDay" type="date" placeholder="11/11/2022"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <label htmlFor="resTime">Time:</label>
                                <select className="form-control" id="resTime">
                                    <option id="8:00">8:00AM</option>
                                    <option id="8:30">8:30AM</option>
                                    <option id="9:00">9:00AM</option>
                                    <option id="20:00">8:00PM</option>
                                    <option id="20:30">8:30PM</option>
                                    <option id="21:00">9:00PM</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <label htmlFor="resSeats">Seats:</label>
                                <input className="form-control" id="resSeats" placeholder="4" type="number"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <label htmlFor="locationSelect">Location:</label>
                                <select className="form-control" id="locationSelect">
                                    <option id="Oswego">Oswego, IL</option>
                                    <option id="Aurora">Aurora, IL</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SomonaukCountryKitchen;