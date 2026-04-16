import React from 'react'

const UserCard = ({user}) => {
  const {firstName , lastName , photoUr,skills,about, age , gender} = user;
    return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    <p>{about}</p>
    <p>{age || 22 +", "+ "male"|| gneder}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
