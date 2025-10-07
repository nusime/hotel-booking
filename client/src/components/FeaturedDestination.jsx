import React from 'react'
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';

const FeaturedDestination = () => {

  const {rooms, navigate} = useAppContext();
  
  return rooms.length > 0 &&(
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

      <Title title='Featured Destination' subTitle='Here are some of our favorite picks:)
      beautiful places that blend comfort, style, and good vibes. 
      Whether you are dreaming of a peaceful escape or something a bit more fancy, 
      those destinations are worth checking out.'/>

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {rooms.slice(0,5).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index}/>
           ))}
        </div>

        <button onClick={() => {navigate('/rooms'); scrollTo(0, 0)}}
        className='my-16 px-6 py-3 text-base font-semibold w-56 border border-gray-500 rounded
        bg-[#54201c] text-white hover:bg-[#6b2c26] transition-all cursor-pointer'>
          View All Destinations
        </button>
    </div>
  );
};

export default FeaturedDestination;