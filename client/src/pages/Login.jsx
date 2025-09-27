import React, { useState, useEffect } from 'react';
import { useSignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logos.jpg';
import loginImg from '../assets/loginImg.png';
import googleIcon from '../assets/googleIcon.png';
import appleIcon from '../assets/appleIcon.png';

const Login = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLoaded) {
            return;
        }

        setLoading(true);

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (result.status === 'complete' && result.createdSessionId) {
                await setActive({session: result.createdSessionId});
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials')
            }
        } catch (err) {
            console.error('Error during sign in:', JSON.stringify(err, null, 2));
            if (err.errors && err.errors.length > 0) {
                setError(err.errors[0].longMessage || 'An unexpected error occurred during login.')
            } else {
                setError('An unexpected error occurred during login.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (strategy) => {
        if (!isLoaded) {
            return;
        }
        setError('');
        setLoading(true);

        try {
            await signIn.authenticateWithRedirect({
                strategy: `oauth_${strategy}`,
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/'
            });
        } catch (err) {
            console.error(`Error with ${strategy} sign in:`, JSON.stringify(err, null, 2));
            setError(`Failed to sign in with ${strategy}. Please try again.`);
            setLoading(false);
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 font-playfair'>
        <div className='flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='relative  w-1/2  bg-no-repeat bg-cover bg-center flex flex-col items-center justify-end p-8 '
            style={{ backgroundImage: `url(${loginImg})` }}>
                <div className='absolute top-8 left-8 flex items-center'>
                    <img src={logo} alt="logo" className= 'h-13 w-13 mr-2'  />
                </div>
                <p className='text-white text-2xl font-bold text-center leading-tight self-center mb-10'>
                    Away from home, but never away from comfort.
                </p>
                <button onClick={() => navigate('/')}
                className='absolute bottom-8 left-8 bg-[#49B9FF]/50 text-white rounded-full 
                p-3 shadow-md hover:bg-[#167cc4] duration-300'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
            <div className='w-1/2 p-12 flex flex-col justify-center'>
                <div className='flex justify-center mb-8'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h2 className='text-3xl text-center font-semibold text-gray-800 mb-8'>
                    Login
                </h2>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {error && (
                        <p className='text-red-500 text-center text-sm'>{error}</p>
                    )}
                    <input type="text" 
                        placeholder='Email'
                        className='w-full px-4 py-3 rounded-lg border border-[#316E6A] hover:bg-[#bdffe8] focus:outline-none'
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                    />
                    <div className='relative flex  items-center'>
                        
                        <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className='w-full px-4 py-3 rounded-lg border border-[#316E6A] hover:bg-[#bdffe8] focus:outline-none'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}>

                            {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.96 9.96 0 013.023-4.592M9.88 9.88a3 3 0 114.24 4.24" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                </svg>
                            ):(
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                            
                        </span>
                    </div>
                    <div className='text-right'>
                        <a href="#" className='text-sm text-[#316E6A] hover:underline'>
                            Forgot Password?
                        </a>
                    </div>
                    <button type='submit'
                    className='w-full bg-[#316E6A] text-white py-3 rounded-lg font-semibold transition duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    disabled={!isLoaded || loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing In...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className='text-sm text-gray-600 text-center mt-6'>
                    Don't have an account? 
                    <span 
                        className='text-[#316E6A] cursor-pointer hover:underline'
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </span>
                </p>

                <div className='flex items-center my-8'>
                    <hr className='flex-grow border-t border-gray-300'/>
                    <span className='px-4 text-gray-500'>or</span>
                    <hr className='flex-grow border-t border-gray-300'/>
                </div>
                <div className='flex space-x-4 justify-center'>
                    <button onClick={() => handleOAuth('google')}
                    className='flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}>
                        <img src={googleIcon} alt="Google" className='w-5 h-5 mr-2' />
                    </button>
                    <button onClick={() => handleOAuth('apple')}
                    className='flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}>
                        <img src={appleIcon} alt="Apple" className='w-5 h-5 mr-2' />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;