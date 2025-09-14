import React, { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, BookOpenIcon, ArrowRightOnRectangleIcon  } from '@heroicons/react/24/outline';
import { assets } from '../assets/assets';


const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const toggleDropdown = () => setOpen(prev => !prev);

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(()=> {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div ref={dropdownRef} className='relative'>
            <div 
            className='flex items-center gap-2 cursor-pointer hover:opacity-90 transition' 
            onClick={toggleDropdown}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
            }}
            tabIndex={0}
            >
                {user?.imageUrl ? (
                    <img
                    src={user.imageUrl}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                ) : (
                    <UserCircleIcon className="w-8 h-8 text-white" />
                )}

                <span className="text-sm text-white font-medium">
                    Hi, {user?.firstName || 'User'}
                </span>
            </div>

            {open && (
                <div className='absolute right-0 mt-2 w-64 bg-white shadow-md rounded-xl py-2 z-50
                animate-dropdown'>

                    <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50'>
                        <img src={user?.imageUrl || assets.userIcon} 
                        alt="profile" 
                        className='w-10 h-10 rounded-full object-cover'
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {user?.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col py-2 divide-y divide-gray-100">
                        <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => alert("Go to manage account page")}
                        >
                            <UserCircleIcon className="h-5 w-5 text-gray-500" />
                            Manage Account
                        </button>

                        <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => {
                            navigate("/my-bookings");
                            setOpen(false);
                            }}
                        >
                            <BookOpenIcon className="h-5 w-5 text-gray-500" />
                            My Bookings
                        </button>

                        <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition"
                            onClick={() => signOut(() => navigate("/"))}
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600" />
                            Sign Out
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserDropdown;
