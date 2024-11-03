import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import { useEffect, useState } from "react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSingleCompany = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                console.log('Response:', res.data);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                    setCompany(res.data.company);
                } else {
                    setError("Failed to fetch company data");
                }
            } catch (error) {
                console.error('Error fetching company:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);

    return { company, loading, error };
};

export default useGetCompanyById;
