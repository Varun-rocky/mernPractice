import React ,{useEffect} from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hooks/useOtherUsers'
import useGetMyTweets from '../hooks/useGetMyTweets'
function Home() {
  const {user,OtherUsers} =useSelector(store=>store.user)
  const navigate =useNavigate();
  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
   const id=user?._id
   useOtherUsers(id);
   useGetMyTweets(id)
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar OtherUsers={OtherUsers}/>
    </div>
  )
}

export default Home
