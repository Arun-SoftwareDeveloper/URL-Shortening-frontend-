import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import "../Styles/Register.css";
// import register from "../Iamges/Register.png";
import codingReg from "../Iamges/coding.webp";

function Register() {
  const handleRegisterForm = async (values) => {
    try {
      const response = await axios.post(
        "https://url-shortning.onrender.com/register",
        {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        }
      );

      if (
        response.data &&
        response.data.message === "Email already Registered!!!"
      ) {
        toast.info("Email already registered");
      } else if (
        response.data &&
        response.data.message ===
          "Registration successful. Please check your email to activate your account."
      ) {
        toast.success("Registered Successfull,Check your Email");
        // toast.success("!!!");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred. Please try again later."
      );
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">REGISTRATION</h1>
      <img src={codingReg} alt="register" className="register-img" />
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is Required!"),
          firstName: Yup.string().required("First Name is Required!"),
          lastName: Yup.string().required("Last Name is Required!"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is Required!"),
        })}
        onSubmit={handleRegisterForm}
      >
        <Form className="register-form">
          <div className="form-group">
            <label>
              <Field
                type="text"
                className="input"
                placeholder="enter your email-ID"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </label>
          </div>
          <div className="form-group">
            <label>
              <Field
                type="text"
                className="input"
                placeholder="enter your first name"
                name="firstName"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <Field
                type="text"
                className="input"
                placeholder="enter your last name"
                name="lastName"
              />
              <ErrorMessage name="lastName" component="div" className="error" />
            </label>
          </div>
          <div className="form-group">
            <label>
              <Field
                type="password"
                className="input"
                placeholder="enter your password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </label>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <p className="login">If you have an account, Please login...</p>
          <Link to="/login">
            <button type="button" className="login-btn-reg">
              Login
            </button>
          </Link>
          {/* <Link to="/activateToken">
            <button type="submit" className="submit-btn">
              ActivateToken
            </button>
          </Link> */}
        </Form>
      </Formik>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
