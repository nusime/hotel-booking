import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-8 md:py-12 mx-2 lg:mx-auto my-30 bg-gray-500 text-white/90">
            
            <Title title='Stay in the Loop with EliteNest'
            subTitle='Discover exclusive hotel deals, travel inspiration, and insider tips—straight to your inbox.' />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <input type="text" 
                className="bg-white/10 px-4 py-3 border border-white/30 rounded outline-none max-w-66 w-full placeholder:text-white/70 focus:ring-2 focus:ring-white/50 transition" 
                placeholder="Enter your email" 
                />
                <button className="flex items-center justify-center gap-2 group bg-[#54201c] hover:bg-gray-800 px-4 md:px-7 py-2.5 rounded active:scale-95 transition-colors duration-200">
                    Subscribe
                    <img src={assets.arrowIcon} alt="arrow-icon"
                    className='w-3 invert group-hover:translate-x-1 transition-all' />
                </button>
            </div>
            <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>

  );
};

export default NewsLetter;