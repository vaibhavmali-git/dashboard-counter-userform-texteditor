import React, { useState, useEffect } from "react";
import "./styles.css";

const UserDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [storedData, setStoredData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = generateUserId();

    saveFormDataToLocalstorage(userId, formData);

    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
    });

    setIsSubmitted(true);

    // Fetch the updated data after saving
    loadStoredData();
  };

  const generateUserId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const saveFormDataToLocalstorage = (userId, data) => {
    const existingData = JSON.parse(localStorage.getItem("userData")) || [];
    existingData.push({ userId, ...data });
    localStorage.setItem("userData", JSON.stringify(existingData));
  };

  const handleBeforeUnload = (e) => {
    if (Object.values(formData).some((value) => value !== "")) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData]);

  useEffect(() => {
    if (isSubmitted) {
      alert("Your data has been stored in local storage.");
      setIsSubmitted(false); // Reset to prevent multiple alerts
    }
  }, [isSubmitted]);

  // Load stored data from local storage
  const loadStoredData = () => {
    const data = JSON.parse(localStorage.getItem("userData")) || [];
    setStoredData(data);
  };

  useEffect(() => {
    loadStoredData(); // Load stored data when the component mounts
  }, []);

  return (
    <div id="userformdata">
      <h1 className="user-dataH1">User Data Form</h1>
      {/* Display the stored data */}
      <div className="stored-data">
        <h3 style={{ textAlign: "center" }}>Stored Data</h3>
        {storedData.length === 0 ? (
          <p style={{textAlign:"center", fontStyle:"italic", fontSize:"12px"}}>No stored data in localstorage.</p>
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
                {index + 1}. <span style={{ fontWeight: "bold" }}>UID: </span>
                {data.userId}:{" "}
                <span style={{ fontWeight: "bold" }}>Name: </span>
                {data.name},{" "}
                <span style={{ fontWeight: "bold" }}>Address: </span>
                {data.address},{" "}
                <span style={{ fontWeight: "bold" }}>E-mail: </span>
                {data.email},{" "}
                <span style={{ fontWeight: "bold" }}>Phone: </span>
                {data.phone}
              </li>
            ))}
          </ul>
        )}
      </div>
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
    </div>
  );
};

export default UserDataForm;
