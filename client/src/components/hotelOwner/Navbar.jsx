import React, { use, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useUser, useClerk } from '@clerk/clerk-react'
import { BookOpenIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    

    if (!user) return null;

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b
    border-gray-300 py-3 bg-[#54201c]/90 transition-all duration-300'>

        <Link to='/'>
            <img src={assets.logo} alt="logo" className='h-9 opacit-80 '/>
        </Link>

        <div className='relative'>
            <img src={user.imageUrl || assets.userIcon} alt="profile" 
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => setOpen(!open)}
            />

            {open && (
                <div className='absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50'>

                    <div className='flex items-center gap-3 px-4 py-3 border-b'>
                        <img src={user.imageUrl || assets.userIcon} alt="profile"
                        className='w-10 h-10 rounded-full' />
                        <div>
                            <p className='text-sm font-semibold'>{user.fullName || "User"}</p>
                            <p className='text-xs text-gray-500'>{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <button className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex 
                        items-center gap-2 transition' onClick={() => alert("Go to manage account page")}>
                            ⚙️ Manage account
                        </button>
                        <button 
                        className="w-full px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition"
                        onClick={() => {
                            navigate('/my-bookings');
                            setOpen(false);
                        }}
                        >
                            <BookOpenIcon className="h-5 w-5 text-gray-500" />
                            My Bookings
                        </button>

                        <button className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center 
                        gap-2 text-red-600 transition'
                        onClick={() => signOut()}>
                            <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
        
    </div>
  );
};

export default Navbar;