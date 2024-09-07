import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  // State to toggle the menu visibility in mobile view
  const [show, setShow] = useState(false);

  // Accessing global state for authorization and user info
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  // Hook to programmatically navigate to different routes
  const navigateTo = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Sending a request to the server to log out the user
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      toast.success(response.data.message); // Show success message
      setIsAuthorized(false); // Update state to reflect user is logged out
      navigateTo("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.response.data.message); // Show error message
      setIsAuthorized(true); // Keep the user authorized if logout fails
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/JobJuntionWhite.png" alt="logo" /> {/* Logo image */}
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          {/* Navigation links */}
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS" 
                : "MY APPLICATIONS"} 
            </Link>
          </li>
          {user && user.role === "Employer" ? ( // Extra links for Employers
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          {/* Logout button */}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        {/* Hamburger menu icon for mobile view */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
