import { LogOut, User2 } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../@/components/ui/popover";
import { Button } from "../button";
import { Avatar, AvatarImage } from "../../../../@/components/ui/avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>FIN<span className='text-[#2dd4bf]'>JOBS</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='text-[#dc2626] flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#0d9488] hover:bg-[#5eead4]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">Isuru Hollupathirage</h4>
                                            <p className='text-sm text-muted-foreground'>Hi Lut Student</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        <div className="flex w-fit items-center gap-2 cursor-pointer ml-2">
                                            <User2 className="h-5 w-5" />
                                            <Button variant="link">View Profile</Button>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer ml-2">
                                            <LogOut className="h-5 w-5" />
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

            </div>


        </div>
    )
}
export default Navbar