import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import { Context } from '../../main'; // Adjust the path if needed
import { getAllJobs, getAllUsers } from '../api'; // Adjust the path if needed

const AdminDashboard = () => {
  const { isAuthorized } = useContext(Context); // Use useContext to access context
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getAllJobs();
        const usersData = await getAllUsers();
        setJobs(jobsData);
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />; // Redirect if not authorized
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="homePage page">
      <h2>All Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>{job.title} - {job.description}</li>
        ))}
      </ul>

      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </section>
  );
};

export default AdminDashboard;
