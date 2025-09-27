import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logos.jpg';

const VerifyEmail = () => {
    const { signUp, isLoaded, setActive } = useSignUp();
    const navigate = useNavigate();
    
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleVerification = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!isLoaded || !signUp) {
            return;
        }

        if (!code.trim()) {
            setError('Please enter the verification code');
            return;
        }

        setLoading(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: code.trim()
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/');
            } else {
                setError('Verification failed. Please check your code and try again.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            if (err.errors && err.errors.length > 0) {
                setError(err.errors[0].longMessage || 'Invalid verification code');
            } else {
                setError('Verification failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!isLoaded || !signUp) {
            return;
        }

        setResending(true);
        setError('');

        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            alert('Verification code sent! Please check your email.');
        } catch (err) {
            console.error('Resend error:', err);
            setError('Failed to resend code. Please try again.');
        } finally {
            setResending(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#316E6A]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-playfair px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="logo" className="h-16 w-16" />
                </div>
                
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    Verify Your Email
                </h2>
                
                <p className="text-gray-600 text-center mb-8">
                    We've sent a verification code to your email address. Please enter it below to complete your registration.
                </p>

                <form onSubmit={handleVerification} className="space-y-6">
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Enter verification code"
                            className="w-full px-4 py-3 rounded-lg border border-[#316E6A] hover:bg-[#bdffe8] focus:outline-none text-center text-lg tracking-widest"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#316E6A] text-white py-3 rounded-lg font-semibold transition duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Verifying...
                            </>
                        ) : (
                            'Verify Email'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm mb-4">
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={handleResendCode}
                        className="text-[#316E6A] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={resending}
                    >
                        {resending ? 'Sending...' : 'Resend Code'}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;