import React, { useState } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { MDBInput } from 'mdb-react-ui-kit';
import {useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";


const Login= () => {
  const navigate = useNavigate();

  const {setLoggedIn} = useUserContext();

  const loginSubmit = async (formdata, { resetForm }) => {
    console.log(formdata);
    resetForm();

    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("request sent");
      resetForm();
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Loggedin Successfully",
      });
      setLoggedIn(true);
      if(data.isAdmin){
        sessionStorage.setItem("admin", JSON.stringify(data));
        navigate("/admin/profile");
      }else{
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/user/summarizer");
      }

    } else if (response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Loggedin Failed",
      });
    } else {
      console.log("Unknown error occured");
    }
  };
  return (
    <div>
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
  <div className="container h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100" >
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{ borderRadius: 25 }}>
          <div className="card-body p-md-5" >
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                 Login
                </p>
                <div className="card-body px-4 py-5 px-md-5">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      onSubmit={loginSubmit}
                    >
                      {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          {/* 2 column grid layout with text inputs for the first and last names */}
                          <div className="row"></div>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <MDBInput
                              type="email"
                              id="email"
                              label=" Email Address"
                              className="form-control form-control-lg"
                              value={values.email}
                              onChange={handleChange}
                            />
                           
                          </div>
                          {/* Password input */}

                          <div className="form-outline mb-4">
                            <MDBInput
                              type="password"
                              id="password"
                              label="Password"
                              className="form-control form-control-lg"
                              value={values.password}
                              onChange={handleChange}
                            />
                            
                          </div>

                          {/* Submit button */}
                          <button
                            type="submit"
                            variant="contained"
                            className="btn btn-outline-primary btn-block mb-4"
                          >
                            Login
                          </button>
                          {/* Register buttons */}
                          <div className="text-center">
                            <p>or sign up with:</p>
                            <button
                              type="button"
                              className="btn btn-link btn-floating mx-1"
                            >
                              <i className="fab fa-facebook-f" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-floating mx-1"
                            >
                              <i className="fab fa-google" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-floating mx-1"
                            >
                              <i className="fab fa-twitter" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-floating mx-1"
                            >
                              <i className="fab fa-github" />
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="https://www.go.ooo/img/bg-img/Login.jpg"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
  );
};

export default Login;