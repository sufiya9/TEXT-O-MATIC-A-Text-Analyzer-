import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";

import Swal from 'sweetalert2'
import fireAlert from 'sweetalert2'


function SweetAlert2() {
  const fireAlert = () => {
      Swal.fire({
          title: 'want to Logout',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          icon: 'warning'
      }
      ).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

              Swal.fire('SUCCESFULLY LOGGED OUT', '', 'success');

          } else
              Swal.fire(' Cancelled', '', 'error')

      })
  }
} 
const Header = () => {
  const { loggedIn, logout } = useUserContext();

  return (
   <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarCenteredExample"
          >
            {/* Left links */}
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  aria-current="page"
                  to="/main/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link  fw-bold" href="/user/summarizer">
                  Summarizer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link  fw-bold" href="/user/sentiment">
                  SentimentAnalysis
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link  fw-bold" href="/user/audiobook">
                  AudioBook
                </a>
              </li>
            </ul>
            {/* Left links */}
          </div>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                aria-current="page"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
