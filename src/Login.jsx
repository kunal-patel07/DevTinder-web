import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmail] = useState("kalp@gmail.com");
  const [password, setPassword] = useState("Kalp@123");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      }, { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset my-4">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
