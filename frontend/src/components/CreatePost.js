import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getIsActive, getRefresh } from "../redux/tweetSlice.js";

function CreatePost() {
  const [description, setDescription] = useState("");
  const {user} =useSelector(store => store.user)
    const dispatch =useDispatch();
    const {isActive} = useSelector(store=>store.tweet);


  const submitHandler = async () => {

    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }
    setDescription("");
  };


   const followingHandler = ()=>{
    dispatch(getIsActive(false))
   }
   const forYouHandler = ()=>{
   dispatch(getIsActive(true))
   }
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly  border-b border-gray-200">
          <div  onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg ">For You</h1>
          </div>
          <div  onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg ">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://imgs.search.brave.com/Z5etVixUopXPaELsCcWcsOjl08E634D3bTyY6DmunPk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci81NzYv/MjA1L0hELXdhbGxw/YXBlci15YXNoLWtn/Zi1zdW5nbGFzc2Vz/LXJvY2t5LXlhc2gt/a2dmLXN1bmdsYXNz/ZXMteWFzaC10aHVt/Ym5haWwuanBn"
                size="50"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-lg ml-2"
              type="text"
              placeholder="What is happening"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <CiImageOn size="24px" />
            </div>
            <button
              onClick={submitHandler}
              className=" bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
