import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState("");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [showToast , setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {

    setError(""); 
    setShowToast(true)
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.updatedProfile.loggedInUser));
      setShowToast("Profile saved successfully!");
     const i  = setTimeout(()=>{
            setShowToast(false) 
      },2000)
    } catch (error) {
      setShowToast(true)
      setError(error?.response?.data || error.message);
      const j = setTimeout(()=>{
        setShowToast(false)
        setError("")
      },2000)
      console.error("ERROR" + error.message);
    }
  };
 
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile </h2>
            <div>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
                 <legend className="fieldset-legend">Gender</legend>
            <select defaultValue="Pick a gender" className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
             <option disabled={true}>Pick a gender</option>
             <option>male</option>
             <option>female</option>
            </select>
            </div>

            <div>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>
             <div className="card-actions justify-center ">
              <button className="btn btn-primary"  onClick={saveProfile}>Save</button>
            </div>
          </div>
        </div>
        {showToast &&(
         <div className="toast toast-top toast-center">
  <div className= {`alert ${error ? "alert-error" : "alert-success"}`}>
    <span>{error || "Profile updated successfully" }</span>  
  </div>
</div>
        )}
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
    </div>
  );
};


export default EditProfile;