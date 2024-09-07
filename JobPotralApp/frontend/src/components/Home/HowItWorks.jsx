import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobJunction Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Your Profile</p>
              <p>
              Join us to unlock personalized job matches and career insights tailored just for you. 
              Start your journey today!
            </p>
            </div>
            <div className="card">
             <MdFindInPage />
            <p>Find or Post Jobs</p>
            <p>Discover job opportunities or post your listings easily.</p>
            </div>
            <div className="card">
            <IoMdSend />
              <p>Apply or Recruit</p>
              <p>Apply for jobs or find the right candidates effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
