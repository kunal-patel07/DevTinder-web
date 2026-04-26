import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error("ERROR" + error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Connections</h1>
      
      <div className="flex flex-col items-center gap-6">
        {connections.map((connection) => {
          const {  firstName, lastName, photoUrl,  skills } = connection;

          return (
            <div key={firstName} className="card card-side bg-base-300 shadow-xl w-full max-w-2xl text-left">
              <figure className="w-32 h-32 sm:w-48 sm:h-auto shrink-0 overflow-hidden">
                <img 
                  src={photoUrl || "https://geographyandhistory.org/wp-content/uploads/2021/04/Blank-Profile-Pic-1.jpg"} 
                  alt="profile" 
                  className="w-full h-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  {firstName} {lastName}
                </h2>
                
                {skills && skills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold mb-1 text-gray-300">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div key={index} className="badge badge-primary badge-outline text-xs">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
