import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/ui/Nav/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../@/components/ui/input';
import { Button } from '../../@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT } from '../utils/constant';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';


const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company._id === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        } else {
            console.error("Company not found for the selected value:", value);
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-10'>
                <form
                    onSubmit={submitHandler}
                    className='p-6 md:p-8 max-w-5xl border border-gray-300 shadow-lg rounded-lg bg-white'
                >
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Post a New Job</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Salary (€)</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Job Type</Label>
                            <select
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm bg-white"
                            >
                                <option value="">Select Job Type</option>
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                            </select>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Experience Level (Years)</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded-md my-1 text-sm"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div className="col-span-1 sm:col-span-2">
                                <Label className="text-sm font-medium text-gray-600">Company</Label>
                                <select
                                    onChange={(e) => selectChangeHandler(e.target.value)}
                                    className="w-full p-2 border rounded-md my-1 text-sm bg-white"
                                >
                                    <option value="">Select a Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 flex items-center justify-center text-sm font-medium">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 text-sm font-medium">Post New Job</Button>
                    )}
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PostJob