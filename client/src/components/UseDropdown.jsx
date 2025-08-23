import React, { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';


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
            <div className='flex items-center gap-2 cursor-pointer' onClick={toggleDropdown}>
                <UserCircleIcon className='w-6 h-6 text-[#5C4033]' />
                <span className='text-sm text-[#5C4033] font-medium'>
                    Hi, {user?.firstName || 'User'}
                </span>
            </div>

            {open && (
                <div className='absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50'>
                    <button className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2'
                    onClick={() => {
                        navigate('/my-bookings');
                        setOpen(false);
                    }}>
                        <BookOpenIcon className="h-4 w-4 text-gray-500" />
                        My Bookings
                    </button>
                    <button className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                    onClick={() => signOut()}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserDropdown;
