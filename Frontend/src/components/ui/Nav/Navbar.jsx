import { LogOut, User2 } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../@/components/ui/popover";
import { Button } from "../button";
import { Avatar, AvatarImage } from "../../../../@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant";
import { toast } from "sonner";
import { setUser } from "../../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='bg-gray-100 shadow-md'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-14 px-4'>
        <div>
          <h1 className='text-xl font-bold text-gray-800'>FIN<span className='text-[#2dd4bf]'>JOBS</span></h1>
        </div>
        <div className='flex items-center gap-8'>
          <ul className='text-gray-700 flex font-medium items-center gap-4'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login"><Button variant="outline" className="hover:bg-gray-200 text-sm">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#0d9488] hover:bg-[#5eead4] text-white text-sm">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer rounded-full">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white shadow-lg rounded-lg p-3">
                <div className='flex gap-3 items-center'>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{user?.fullname}</h4>
                    <p className='text-xs text-gray-600'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {user && user.role === 'student' && (
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link" className="text-sm"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer ml-2">
                    <LogOut className="h-5 w-5" />
                    <Button onClick={logoutHandler} variant="link" className="text-sm">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
