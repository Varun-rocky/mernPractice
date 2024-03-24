import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from "../redux/userSlice";
import {getRefresh} from "../redux/tweetSlice"

function Profile() {
  const { profile, user } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch =useDispatch();
  const followAndUnfollowHandler =async () =>{
    if(user?.following?.includes(id)){
      //unfollow
      try{
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message);
      }
      catch(err){
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
    else{
      //follow
      try{
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message);
      }
      catch(err){
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
  }
   

  return (
    <div className="w-[50%] border-l border-r border-gray-500">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>

        <img
          src="https://imgs.search.brave.com/SPfW51se4jqchSzTF2kjE_STA4IZGZn_JXBH1zmORnA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQwODIx/MjkuanBn"
          alt="vrock"
          className="w-full"
          size={240}
        />
        <div className="absolute top-32 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://imgs.search.brave.com/Z5etVixUopXPaELsCcWcsOjl08E634D3bTyY6DmunPk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci81NzYv/MjA1L0hELXdhbGxw/YXBlci15YXNoLWtn/Zi1zdW5nbGFzc2Vz/LXJvY2t5LXlhc2gt/a2dmLXN1bmdsYXNz/ZXMteWFzaC10aHVt/Ym5haWwuanBn"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          
            {profile?._id === user?._id ? (
              <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followAndUnfollowHandler}
                className="px-4 py-1 bg-black text-white rounded-full"
              >
                {user?.following?.includes(id) ? "Following" : "Follow"}
              </button>
            )}
        
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl"> {profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            🌐 Exploring and trying to adapt myself with new Technologies
            everyday 🚀 | Understanding the tech and trying to contribute |
            Fitness Enthusiast | Join me on this coding journey!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
