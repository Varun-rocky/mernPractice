import {User} from '../models/userSchema.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async(req,res) =>{
    try{
        const {name,username,email,password} =req.body;
        if(!name || !username || !email || !password){
            return res.status(401).json({
                message:"All fields are required. ",
                success:false
            })
        }
        const user =await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exists. ",
                success:false
            })
        }
        const userName=await User.findOne({username});
        if(userName){
            return res.status(401).json({
                message:"Choose different username",
                success:false
            })
        }
       const hashedPassword = await bcryptjs.hash(password,16);
    
       await User.create({
        name,
        username,
        email,
        password:hashedPassword
       });

       return res.status(201).json({
        message:"Account created successfully ",
        success:true
       })

    }
    catch(error){
   console.log(error)
    }
}


export const Login =  async (req,res) =>{
    try{
      const {email,password} = req.body;

      if(!email ||  !password){
        return res.status(401).json({
            message:"All fields are required. ",
            success:false
        })
      }
      const user =await User.findOne({email});
      if(!user){
        return res.status(401).json({
            message:"Incorect email or password ",
            success:false
        })
      }

      const isMatch = await bcryptjs.compare(password,user.password)
      if(!isMatch){
        return res.status(401).json({
            message:"Incorect email or password",
            success:false
        })
      }
      const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
       return res.status(201).cookie("token",token,{ expiresIn: "1d", httpOnly: true }).json({
        message: `Welcome back ${user.name}`,
        user,
        success: true
       })
    }
    catch(error){
        console.log(error)
    }
}

export const Logout = (req,res) =>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message: "user logged out successfully.",
        success: true
    })
}

export const bookmark = async (req,res) =>{
    try{
      const loggedInUserId = req.body.id;
      const tweetId =req.params.id
      const user = await User.findById(loggedInUserId);
      if(user.bookmarks.includes(tweetId)){
        //remove if it exists already
        await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmarks:tweetId}})
        return res.status(200).json({
            message: "Removed from bookmarks."
        });
      }
      else {
        //boookmark the tweeet
        await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Saved to bookmarks."
            });
      }
    }
    catch(err){
        console.log(err)
    }
}

export const getMyProfile =async(req,res) =>{
    try{
      const id =req.params.id
      
      const user =await User.findById(id).select("-password");
      return res.status(200).json({
        user,
      })
    }
    catch(err){
        console.log(err)
    }
}

export const getOtherUsers =async (req,res) => {
    try{
        const {id} =req.params
        const OtherUsers = await User.find({_id:{$ne:id}}).select("-password")
        if(!OtherUsers){
            return res.status(401).json({
                message:"currently other users are not present"
            })
        }

        return res.status(200).json({
            OtherUsers
        })
    }
    catch(err){
        console.log(err)
    }
}

export const follow = async(req,res) =>{
    try{
     const loggedInUserId =req.body.id // one who gonna follow varun
     const followUserId =req.params.id; // whom varun gonnna follow virat kohli
     //varun follows virat kohli
       const loggedInUser= await User.findById(loggedInUserId)
       const followUser =await User.findById(followUserId)

       if(!followUser.followers.includes(loggedInUserId)){
        await followUser.updateOne({$push:{followers:loggedInUserId}});
        await loggedInUser.updateOne({$push:{following:followUserId}})
       }
       else{
        return res.status(400).json({
            message:`User already follows ${followUser.name}`
        })
       }

       return res.status(200).json({
        message:`${loggedInUser.name} just followed to ${followUser.name}`,
        success:true
       })
    }
    catch(err){
        console.log(err)
    }
}


export const unfollow =async(req,res) => {
    try{
      const loggedInUserId = req.body.id
      const unfollowUserId =req.params.id
      const loggedInUser = await User.findById(loggedInUserId)
      const unfollowUser = await User.findById(unfollowUserId)
      if(loggedInUser.following.includes(unfollowUserId)){
        await loggedInUser.updateOne({$pull:{following:unfollowUserId}})
        await unfollowUser.updateOne({$pull:{followers:loggedInUserId}})
      }
      else{
        return res.status(400).json({
            message:'user has not followed yet'
        })
      }

      return res.status(200).json({
        message:`${loggedInUser.name} just unfollowed ${unfollowUser.name}`,
        success:true
      })
    }
    catch(err){
        console.log(err)
    }
}