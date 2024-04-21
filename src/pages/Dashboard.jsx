import React, { useEffect, useState } from "react";
import Header from "../components/Common Components/Header";
import Counter from "../components/Counter";
import UserDataForm from "../components/UserFormData";
import TextEditor from "../components/TextEditor";
import UserTrendsChart from "../components/UserTrendsChart";

function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserTrendsChart />
          <Counter />
          <UserDataForm />
          <TextEditor />
        </>
      )}
    </div>
  );
}

export default Dashboard;
