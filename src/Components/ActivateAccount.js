import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ActivateAccount.css"; // Import your custom CSS file

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ActivateAccount() {
  const [token] = useSearchParams();
  const [activationStatus, setActivationStatus] = useState("pending");

  useEffect(() => {
    async function activateAccount() {
      try {
        console.log(token.get("token"));
        const response = await axios.get(
          `https://url-shortning.onrender.com/activateAccount?token=${token.get(
            "token"
          )}`
        );
        setActivationStatus("success");
        toast.success(response.data.message); // Display success message
      } catch (error) {
        console.error("Error activating account:", error);
        setActivationStatus("failed");
        toast.error("An error occurred while activating your account."); // Display error message
      }
    }

    activateAccount();
  }, [token]);

  return (
    <div className="activate-account">
      <h1 className="activate-account-title">Account Activation</h1>
      {activationStatus === "pending" && (
        <div className="loading-container">
          <BeatLoader
            css={override}
            size={15}
            color={"#36D7B7"}
            loading={true}
          />
          <p className="loading-text">Activating your account...</p>
        </div>
      )}
      {activationStatus === "success" && (
        <div className="success-container">
          <p className="success-message">
            Your account has been activated successfully. You can now log in.
          </p>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      )}
      {activationStatus === "failed" && (
        <p className="error-message">
          An error occurred while activating your account. Please try again
          later.
        </p>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default ActivateAccount;
