import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState("");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills , setSkills] = useState(user.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [showToast , setShowToast] = useState(false);
  const MAX_SKILLS = 5;

  const addSkill = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (skills.length >= MAX_SKILLS) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    setSkills([...skills, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
    // Remove last chip on Backspace if input is empty
    if (e.key === "Backspace" && skillInput === "" && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  };

  const dispatch = useDispatch();
 const navigate = useNavigate();
  const saveProfile = async () => {

    setError(""); 
    setShowToast(true)
    try {
      // Build payload, only include gender if user has selected one
      const payload = { firstName, lastName, age, photoUrl, about, skills };
      if (gender && gender !== "") {
        payload.gender = gender;
      }

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        payload,
        { withCredentials: true },
      );
      dispatch(addUser(res.data.updatedProfile.loggedInUser));
      setShowToast("Profile saved successfully!");
     const i  = setTimeout(()=>{
            setShowToast(false) 
      },2000)

      return navigate("/feed");
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


  <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills (max {MAX_SKILLS})</legend>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary gap-1 py-3 px-3">
                      {skill}
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs px-0 text-primary-content hover:text-error"
                        onClick={() => removeSkill(index)}
                      >✕</button>
                    </div>
                  ))}
                </div>
                {skills.length >= MAX_SKILLS ? (
                  <p className="text-xs text-warning">Maximum {MAX_SKILLS} skills allowed</p>
                ) : (
                  <input
                    type="text"
                    className="input"
                    placeholder="Type a skill & press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                  />
                )}
              </fieldset>

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
      <UserCard user={{ firstName, lastName, photoUrl, about, age, gender, skills }} hideActions={true} />
    </div>
  );
};


export default EditProfile;