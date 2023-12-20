import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/UrlShortner.css"; // Import your CSS file

const URLShortener = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://url-shortning.onrender.com/create",
        {
          longURL,
        }
      );
      setShortURL(response.data.shortURL);

      // After successfully generating a short URL, navigate to /created
      navigate("/created");
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <>
      <h2 className="title-url">URL Shortener</h2>

      <div className="url-shortener">
        <input
          type="text"
          placeholder="Enter long URL"
          className="input"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <button className="button" onClick={handleSubmit}>
          Generate Short URL
        </button>
        {shortURL && <p className="short-url">Short URL: {shortURL}</p>}
      </div>
    </>
  );
};

export default URLShortener;
