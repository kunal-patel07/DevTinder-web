import React, { useEffect } from 'react'
import axios from "axios"
import {BASE_URL} from "../utils/constant"
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestsSlice'

const Requests = () => {

   const requests = useSelector((store)=> store.requests);
   const dispatch = useDispatch();

  const fetchRequest = async ()=>{
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received" , {withCredentials:true}) 
      dispatch(addRequests(res.data.findConnections));
    } catch (error) {
      console.error(error.message);
    }
  }
    
  useEffect(()=>{
    fetchRequest();
  },[])

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  }
  
  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Connection Requests</h1>

      <div className="flex flex-col items-center gap-6">
        {requests.map((request) => {
          const {_id, firstName, lastName,photoUrl,skills } = request.fromUserId;

          return (
            <div key={request._id} className="card card-side bg-base-300 shadow-xl w-full max-w-2xl text-left">
              <figure className="w-32 h-32 sm:w-48 sm:h-auto shrink-0 overflow-hidden">
                <img 
                  src={photoUrl} 
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

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-secondary">Accept</button>
                  <button className="btn btn-primary">Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests
