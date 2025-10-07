import React from 'react'
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';

const RecommendedHotel = () => {

  const {rooms, searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms.filter(room => 
        searchedCities.some(city => 
            room.hotel.city.toLowerCase().includes(city.toLowerCase())
        ));
    setRecommended(filteredHotels);
  }

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);
  
  return recommended.length > 0 &&(
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

      <Title title='Recommended Hotels' subTitle='"Experience our carefully chosen hotels that 
      combine exceptional comfort, style, and memorable moments.'
      />

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {recommended.slice(0,5).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index}/>
           ))}
        </div>

    </div>
  );
};

export default RecommendedHotel;