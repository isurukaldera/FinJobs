import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,);
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies