import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import navlogo from "./img/navlogo.png";
import { useUserContext } from "../../context/UserProvider";

const Header = () => {

  // const { logout} = useUserContext();

  // const showLoggedIn = () => {
  //   if (!loggedIn) {
  //     return (
  //       <div className="d-flex align-items-center">
  //             <NavLink
  //               type="button"
  //               className="btn btn-primary px-3 me-2"
  //               to="/main/login"
  //             >
  //               Login
  //             </NavLink>
  //             <NavLink
  //               type="button"
  //               className="btn btn-primary me-3"
  //               to="/main/signup"
  //             >
  //               Sign up for free
  //             </NavLink>
  //           </div>
  //     );
  //   }else{
  //     return <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
  //     <li className="nav-item">
  //         <button className="btn btn-danger ms-3" aria-current="page" onClick={logout}>
  //           Logout
  //         </button>
  //       </li>
  //       </ul>
  //   }
  // }

  return (
    <div>
      <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light" >
    <div className="container-fluid">
      <a href="#" className="navbar-brand">
        <img src={navlogo} height={28} alt="CoolBrand" />
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav">
        <li className="nav-item">
                  <NavLink className="nav-link" to="/main/home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/summarizer">
                    Summmarizer
                  </NavLink>
                </li>
    
               
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main/contactus">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* {showLoggedIn()} */}
            
            {/* Collapsible wrapper */}
          </div>
          {/* Container wrapper */}
        </nav>
      </>
    </div>
  );
};

export default Header;
