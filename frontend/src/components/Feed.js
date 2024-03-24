import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import {useSelector} from "react-redux";

function Feed() {
  const {tweets} = useSelector(store=>store.tweet);
 
  return (
    <div className='w-[60%] border border-gray-200'>
     <CreatePost/>
     {

        tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
     }
   
    </div>
  )
}

export default Feed
