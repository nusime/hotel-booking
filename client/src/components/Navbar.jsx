import React, {useEffect, useState} from 'react';
import {useLocation, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useUser, useClerk } from '@clerk/clerk-react';
import UserDropdown from './useDropdown.jsx';


const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];


    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
    if (hideNavbar) {
        return null; // Don't render the Navbar on login or signup pages
    }


    useEffect(() => {

         const handleScroll = () => {
             if(location.pathname === '/'){
                setIsScrolled(window.scrollY > 10);

             } else {
            setIsScrolled(true);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (

            <nav className={`fixed top-0 left-0 w-full 
            flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 
            transition-all duration-500 z-50 text-white py-3 md:py-4 ${isScrolled? 'bg-[#54201c] backdrop-blur-md shadow-md': 'bg-transparent'}`}>

                {/* Logo */}
                <Link to="/" className={`flex items-center gap-1`}>
                    <img src={assets.logo} 
                    alt="logo" className= 'h-20 w-30' />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.path} className= 'group flex flex-col gap-0.5 text-white'>
                            {link.name}
                            <div className= 'h-0.5 w-0 group-hover:w-full transition-all duration-300' />
                        </Link>
                    ))}
                    <Link to='/dashboard'>
                        <button className= 'border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all'>
                            Dashboard
                        </button>
                    </Link>
                    
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={assets.searchIcon} alt="Search icon image" className= 'h-7 transition-all duration-500' />

                    {!isLoginPage && ( user? (
                        <UserDropdown />
                        ) : (
                            <Link to='/login'>
                                <button className="bg-[#49B9FF]/50 text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                                    Login
                                </button>
                            </Link>   
                        )
                    )}
                    
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <img onClick={()=> setIsMenuOpen(!isMenuOpen)} 
                    src={assets.menuIcon} alt="" 
                    className={`${isScrolled && 'invert'}`} />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base 
                flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 
                    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <img src={assets.closeIcon} alt="close-menu" className="h-[26px]"/>
                    </button>

                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </Link>
                    ))}

                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </Link>

                    {!isLoginPage && ( user? (
                        <button onClick={() => signOut()}
                        className='bg-red-600 text-white px-6 py-2.5 rounded-full ml-2 transition-all duration-500'>
                            LogOut
                        </button>
                        ) : (
                            <Link to='/login'>
                                <button className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                                    Login
                                </button>
                            </Link>   
                        )
                    )}

                </div>
            </nav>
    );
}
export default Navbar;