import React from "react";
import {MDBIcon} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/ShowMore.css'

const ShowMore = () => {
    return (
        <>
            <h1 className="show-more">
                <button>Show more
                    <span>
                        <MDBIcon fas icon="angle-down" />
                    </span>
                </button>
            </h1>
        </>
    )
};

export default ShowMore;