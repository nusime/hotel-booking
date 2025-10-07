import React from 'react'
import { assets, cities } from '../assets/assets';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const {navigate, getToken, axios, setSearchedCities} = useAppContext();
  const [destination, setDestitation] = useState('');

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    // Call api to save recent searched City
    await axios.post('/api/user/recent-searched-cities', {recentSearchedCity: destination},
      {headers: {Authorization: `Bearer ${await getToken()}`}});

    // Add destination to searchedCities max 3 recent searched cities
    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [...prevSearchedCities, destination];
      if (updatedSearchedCities.length > 3) {
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities;
    })
  }

  return (
    
    <div className='relative z-20 flex flex-col items-start justify-center px-6
    md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/hero.jpg")] 
    bg-no-repeat bg-cover bg-center h-screen w-full'>
        
      <p className='bg-[#49B9FF]/50 px-3 py-1 rounded-full mt-20'>
          Some places feel like a pause, ours feels like a hug.
      </p>
        
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px]
      font-bold md:font-extrabold max-w-xl mt-4'>
          You bring the bags. We will bring the peace.
      </h1>
        
      <p className='max-w-130 mt-2 text-sm md:text-base'>
          At EliteNest, comfort meets charm in every corner. 
          Whether it's one night or one week — stay cozy, 
          stay graceful, stay with us.
      </p>
        
      <form onSubmit={onSearch}
      className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 
      flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

        {/* {Destination Input} */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4"/>
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
          onChange={(e) => setDestitation(e.target.value)} 
          value={destination}
          list='destinations' 
          id="destinationInput" 
          type="text" 
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
          placeholder="Type here" 
          required 
          />

          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>
        {/* CheckIN Input */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4"/>
            <label htmlFor="checkIn">Check in</label>
          </div>
            
          <input 
          id="checkIn" 
          type="date" 
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
          />
        </div>

        {/* CheckOUT Input */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4"/>
            <label htmlFor="checkOut">Check out</label>
          </div>
                
          <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
        </div>

        {/* Guests Input */}
        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
        </div>

        <button className='flex items-center justify-center gap-1 rounded-md 
        bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
          <img src={assets.searchIcon} alt="search icon" className='h-7' />
          <span>Search</span>
        </button>
      </form>
    </div>
  )
}

export default Hero