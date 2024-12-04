import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { APPLY_URL_API } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";


const useGetAppliedJobs =  ()=>{
    const dispatch = useDispatch();
     useEffect(()=>{
        const fetchAllApplies = async()=>{
          try {
            const res = await axios.get(`${APPLY_URL_API}/get` , {
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.applieds))
            }
          } catch (error) {
            console.log(error)
          }
        }
        fetchAllApplies();

     },[])
}
export default useGetAppliedJobs