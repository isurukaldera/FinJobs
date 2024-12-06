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
        password: "",
        role: "student", // Default role
    });

    const { Loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        // Form validation
        if (!input.email || !input.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            dispatch(setLoading(true)); // Show loading state

            // API Request for login
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Include for cookies if required
                }
            );

            if (res.data.success) {
                const token = res.data.token;
                console.log("Token received:", token);

                // Store token securely in localStorage
                localStorage.setItem("token", token);

                // Update Redux user state
                dispatch(setUser(res.data.user));

                // Redirect to the homepage
                navigate("/");

                // Success message
                toast.success(res.data.message || "Login successful.");
            } else {
                toast.error(res.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data);

            // Handle server-side or network errors
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            dispatch(setLoading(false)); // Hide loading state
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                >
                    <h1 className="font-bold text-xl mb-5">Log in with FinJobs</h1>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="text"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="isuru.kaldera@gmail.com"
                        />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="*********"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
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
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {Loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Login
                        </Button>
                    )}

                    <span className="flex gap-2 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600">
                            Sign Up
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
