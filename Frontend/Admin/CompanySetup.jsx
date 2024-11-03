import React, { useEffect, useState } from 'react';
import Navbar from '../src/components/ui/Nav/Navbar';
import { Button } from '../@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '../src/utils/constant';
import { Input } from '../@/components/ui/input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../src/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: singleCompany.file || null
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.name || !input.description || !input.website || !input.location) {
            toast.error("Please fill out all fields before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Company updated successfully.");
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error('Error updating company:', error);
            toast.error(error.response?.data?.message || "An error occurred while updating the company.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md'>
                    <div className='flex items-center gap-5 mb-6'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <span className="flex items-center"><ArrowLeft /></span>
                            <span className="font-bold">Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <Label className='block mb-1 font-bold'>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="border rounded-md p-2 w-1/2"
                                placeholder="Enter company name"
                            />
                        </div>
                        <div>
                            <Label className='block mb-1 font-bold'>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="border rounded-md p-2 w-1/2"
                                placeholder="Enter description"
                            />
                        </div>
                        <div>
                            <Label className='block mb-1 font-bold'>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="border rounded-md p-2 w-1/2"
                                placeholder="Enter website URL"
                            />
                        </div>
                        <div>
                            <Label className='block mb-1 font-bold'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="border rounded-md p-2 w-1/2"
                                placeholder="Enter location"
                            />
                        </div>
                        <div>
                            <Label className='block mb-1 font-bold'>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="border rounded-md p-2 w-1/2"
                            />
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <Button disabled className="w-full my-4 w-1/2">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 w-1/2">
                                Update
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
