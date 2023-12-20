import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/CreatedUrl.css"; // Import your CSS file

const CreatedURLsTable = () => {
  const [urls, setURLs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://url-shortning.onrender.com/urls"
      );
      setURLs(response.data);
    } catch (error) {
      console.error("Error fetching created URLs:", error);
    }
  };

  return (
    <div className="created-urls-container">
      <h2 className="table-title">Created URLs</h2>
      <table className="urls-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.shortURL}</td>
              <td>{url.longURL}</td>
              <td>{url.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedURLsTable;
