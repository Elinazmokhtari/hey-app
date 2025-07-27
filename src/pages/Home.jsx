import React from 'react'
import userSlice from '../redux/slices/userSlice'
import { useSelector } from 'react-redux'

function Home() {
  const user = useSelector((state)=>state.userSlice.user)
  return (
    <>
    <div>Home</div>
    <h3>{user.name}</h3>
    </>
  )
}

export default Home