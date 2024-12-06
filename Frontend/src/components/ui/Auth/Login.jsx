import React, { useState } from 'react';
import Navbar from '../Nav/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../../../@/components/ui/input';
import { Button } from '../button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../../utils/constant';
import { toast } from 'sonner';
import { RadioGroup } from '../../../../@/components/ui/radio-group';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../../redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "", // Updated to match the input field names
    });

    const { Loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password) {
            toast.error("Please fill in all fields.");
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        console.log(input);
    
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,  // Make sure to include this for cookies if needed
            });
    
            if (res.data.success) {
                // Store token in localStorage after successful login
                localStorage.setItem("token", res.data.token);
                console.log("Token stored in localStorage:", res.data.token); // For debugging
                
                dispatch(setUser(res.data.user)); // Store user details in Redux if needed
                navigate("/"); // Redirect to home or another page after login
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response?.data); // Log detailed error from the server
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Login failed. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            dispatch(setLoading(false)); // Reset loading state
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Log in with FinJobs</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="isuru.kaldera@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="*********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        Loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='flex gap-2 text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign Up</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;
