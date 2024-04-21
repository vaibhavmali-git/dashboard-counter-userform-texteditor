import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Table, Container, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./styles.css";

const UserProfiles = () => {
  const [user, loading] = useAuthState(auth);
  const [createdAt, setCreatedAt] = useState(null);

  const fetchUserCreatedAt = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const createdAtTimestamp = userDoc.data().createdAt;
      if (createdAtTimestamp) {
        setCreatedAt(createdAtTimestamp.toDate());
      }
    }
  };

  const addUserToFirestore = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (!loading && user) {
      fetchUserCreatedAt(user);
    }
  }, [user, loading]);

  useEffect(() => {
    if (user && createdAt === null) {
      // If 'createdAt' is not found, write it to Firestore and re-fetch.
      addUserToFirestore(user).then(() => fetchUserCreatedAt(user));
    }
  }, [createdAt, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user is currently logged in.</p>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <Container className="user-profiles">
        <div className="user-details">
          <h2 className="title">User Details</h2>
          <Row>
            <Col>
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user.displayName || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Photo</td>
                    <td>
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={`${user.displayName}'s profile`}
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Account Created At</td>
                    <td>
                      {createdAt ? createdAt.toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        <div className="line-chart">
          {createdAt && (
            <Row>
              <Col>
                <h2 className="title">User Trends</h2>
                <LineChart
                  width={270}
                  height={300}
                  data={[{ date: createdAt, count: 1 }]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) => tick.toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default UserProfiles;
