import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Removed unused imports
import "../Styles/ResetPassword.css";

const ResetPassword = () => {
  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "https://url-shortning.onrender.com/resetPassword",
        {
          email: values.email, // Send email as part of the request
          resetToken: values.resetToken,
          newPassword: values.newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful!");
      } else {
        toast.error("Error resetting password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    resetToken: Yup.string().required("Required"),
  });

  return (
    <div className="reset-password-container">
      <span>
        <h1 className="title-reset">RESET PASSWORD</h1>
      </span>
      <Formik
        initialValues={{
          email: "",
          newPassword: "",
          confirmPassword: "",
          resetToken: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ isSubmitting }) => (
          <Form className="reset-form-container">
            <div>
              <Field type="text" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field
                type="password"
                name="newPassword"
                placeholder="New Password"
              />
              <ErrorMessage name="newPassword" component="div" />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <div>
              <Field type="text" name="resetToken" placeholder="Reset Token" />
              <ErrorMessage name="resetToken" component="div" />
            </div>
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
            <Link to="/login">Go to Login</Link>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;
