import React from "react";
// import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../Styles/ForgotPassword.css";

const ForgotPassword = () => {
  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      await axios.post("https://url-shortning.onrender.com/forgotPassword", {
        email: values.email,
      });
      toast.success("Password reset email sent. Please check your email.");
    } catch (error) {
      toast.error("Error sending password reset email. Please try again.");
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required !").email("Invalid email"),
  });

  return (
    <div className="forgot-password-container">
      <span>
        <h1 className="title-forgot">FORGOT PASSWORD</h1>
      </span>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
      >
        {({ isSubmitting }) => (
          <Form className="forgot-form-container">
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending Email..." : "Send Reset Email"}
            </button>
            <Link to="/login">Go to Login</Link>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
