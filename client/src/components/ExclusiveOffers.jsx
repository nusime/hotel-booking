import React from 'react'
import Title from './Title';
import { assets, exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
        <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <Title align='left' title='Exclusive Offers' subTitle='Enjoy hand-picked deals and limited-time offers just for you. 
            From discounted stays to special perks, 
            our exclusive offers are designed to make your next getaway even more rewarding.'/>
            <button className='group flex items-center bg-[#B86A5C] font-medium  
            px-6 py-2.5 rounded-full hover:bg-[#A35A51] gap-2 cursor-pointer md-mt-12'>
                View All offers
                <img src={assets.arrowIcon} alt="arow-icon"
                className='group-hover:translate-x-1 transition-all' />
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
            {exclusiveOffers.map((item) => (
                <div key={item._id} className='group relative flex flex-col items-start justify-between
                gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white drop-shadow-lg bg-no-repeat bg-cover 
                bg-center overflow-hidden'
                style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`}}>
                    <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white
                    text-gray-800 rounded-full'>
                        {item.priceOff}% OFF
                    </p>

                    <div>
                        <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                        <p>{item.description}</p>
                        <p className='text-xs text-white/70 mt-3'>Expires {item.expiryDate}</p>
                    </div>
                    <button className='flex items-center font-medium bg-white text-gray-800 px-4 py-2 
                    rounded-full gap-2 cursor-pointer mt-4 mb-5'>
                        View Offers
                        <img className='group hover:translate-x-1 transition-all' 
                        src={assets.arrowIcon} alt="arow-icon" />
                    </button>
                </div>
                
            ))}
        </div>

    </div>
  )
}

export default ExclusiveOffers;