import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
    } catch (error) {
      console.error("ERROR" + error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return <div className="flex justify-center my-10">
    <h1 className="">Connections</h1>
  </div>;
};

export default Connections;
