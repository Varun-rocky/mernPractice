import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import {  getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`,{
                    withCredentials:true
                });
            
                dispatch(getOtherUsers(res.data.OtherUsers));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    },[]);
};
export default useOtherUsers;