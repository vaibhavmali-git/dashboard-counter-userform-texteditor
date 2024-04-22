import React, { useState, useEffect } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import "./styles.css";

const UserDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [storedData, setStoredData] = useState([]);

  // Handle form changes and mark as unsaved
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsUnsavedChanges(true);
  };

  // Handle form submission and save to local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Math.floor(Math.random() * 1000);
    saveFormDataToLocalstorage(userId, formData);

    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
    });

    setSnackbarOpen(true);
    setIsUnsavedChanges(false);
    loadStoredData();
  };

  const saveFormDataToLocalstorage = (userId, data) => {
    const existingData = JSON.parse(localStorage.getItem("userData")) || [];
    existingData.push({ userId, ...data });
    localStorage.setItem("userData", JSON.stringify(existingData));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const loadStoredData = () => {
    const data = JSON.parse(localStorage.getItem("userData")) || [];
    setStoredData(data);
  };

  const handleBeforeUnload = (e) => {
    if (isUnsavedChanges) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  // Add event listener for window unload with dependency on unsaved changes
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUnsavedChanges]);

  useEffect(() => {
    loadStoredData();
  }, []);

  return (
    <div id="userformdata">
      <h1 className="user-dataH1">User Data Form</h1>

      {/* Display stored data */}
      <div className="stored-data">
        <h3 style={{ textAlign: "center" }}>Stored Data</h3>
        {storedData.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: "12px",
            }}
          >
            No stored data.
          </p>
        ) : (
          <ul>
            {storedData.map((data, index) => (
              <li
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  listStyle: "none",
                }}
                key={index}
              >
                {index + 1}. <span style={{ fontWeight: "bold" }}>UID:</span>
                {data.userId}: <span style={{ fontWeight: "bold" }}>Name:</span>
                {data.name},{" "}
                <span style={{ fontWeight: "bold" }}>Address:</span>
                {data.address},{" "}
                <span style={{ fontWeight: "bold" }}>Email:</span>
                {data.email}, <span style={{ fontWeight: "bold" }}>Phone:</span>
                {data.phone}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User data form */}
      <div className="userformDiv">
        <div className="signup-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label>
                Name:
                <input
                  placeholder="Name"
                  className="custom-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="input-wrapper">
              <label>
                Address:
                <input
                  placeholder="Address"
                  className="custom-input"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="input-wrapper">
              <label>
                Email:
                <input
                  placeholder="Email"
                  className="custom-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="input-wrapper">
              <label>
                Phone:
                <input
                  placeholder="Phone"
                  className="custom-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Snackbar for submission feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your data has been stored in local storage.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserDataForm;
