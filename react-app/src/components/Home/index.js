import React from "react";
import "./Home.css";
import logo from "../../media/logo.svg";
import svg from "../../media/index-page.svg"
import Search from "../Search"


function Home() {
    return (
        <div className="home-page">
            <div className="header"></div>
            <div className="main-content">
                <div className="main-content-container">
                    <div className="container">
                        <img src={logo} alt="Logo" className="logo" />
                        <Search />
                    </div>

                    <img src={svg} alt="Logo" className='party-svg' />
                </div>
            </div>
            <div className="footer">
            </div>




        </div>
    )
}

export default Home;
