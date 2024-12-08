import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import { useEffect, useState } from "react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;

