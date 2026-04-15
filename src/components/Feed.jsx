import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/Constant'

const Feed = () => {

  const getFeed =async () =>{
    const res = axios.get(BASE_URL + "/feed")
  }
  return (
    <div>
      
       
    </div>
  )
}

export default Feed
