import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user, hideActions = false}) => {
  const {firstName , lastName,photoUrl , about, age , gender, skills} = user;
  const dispatch = useDispatch();
 const handleSendRequest =async (status, userId)=>{
   try {

      const res  = await axios.post(BASE_URL + "/request/send/" + status+ "/"+ userId , {} , {withCredentials : true});
    dispatch(removeFeed(userId));
   } catch (error) {
    console.error(error);
    }
 }

    return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    <p>{about}</p>
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
    {age && gender && <p>{age + " " + gender}</p>}
    {!hideActions && (
      <div className="card-actions justify-center my-4">
        <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored", user._id)}}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>{handleSendRequest("interested", user._id)}}>Interested</button>
      </div>
    )}
  </div>
</div>
  )
}

export default UserCard
