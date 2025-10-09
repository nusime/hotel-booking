import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Experience = () => {
  const experiences = [
    {
      icon: assets.freeWifiIcon,
      title: 'Premium Amenities',
      description: 'Enjoy complimentary high-speed WiFi, luxury toiletries, and modern comfort in every room.',
      color: 'bg-blue-50'
    },
    {
      icon: assets.freeBreakfastIcon,
      title: 'Gourmet Dining',
      description: 'Start your day with our signature breakfast buffet featuring local and international cuisine.',
      color: 'bg-orange-50'
    },
    {
      icon: assets.poolIcon,
      title: 'Wellness & Recreation',
      description: 'Refresh in our infinity pool, unwind at our spa, or stay active at our state-of-the-art gym.',
      color: 'bg-green-50'
    },
    {
      icon: assets.roomServiceIcon,
      title: '24/7 Concierge',
      description: 'Our dedicated team is always ready to assist with reservations, tours, and special requests.',
      color: 'bg-purple-50'
    },
    {
      icon: assets.mountainIcon,
      title: 'Local Experiences',
      description: 'Discover hidden gems with our curated city tours and authentic cultural experiences.',
      color: 'bg-pink-50'
    },
    {
      icon: assets.badgeIcon,
      title: 'Exclusive Events',
      description: 'Gain access to special events, rooftop gatherings, and networking opportunities.',
      color: 'bg-yellow-50'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      image: assets.hikmi,
      rating: 5,
      review: 'The attention to detail was extraordinary. From the warm welcome to the personalized recommendations, every moment felt special. The rooftop sunset views were absolutely magical!'
    },
    {
      name: 'James Chen',
      location: 'Singapore',
      image: assets.nazri,
      rating: 5,
      review: 'I travel frequently for business, and this is now my go-to hotel. The workspace in the room, fast WiFi, and 24/7 room service made my stay incredibly productive and comfortable.'
    },
    {
      name: 'Emma Thompson',
      location: 'London, UK',
      image: assets.tsita,
      rating: 5,
      review: 'An unforgettable anniversary celebration! The staff surprised us with champagne and a decorated room. The spa treatments were divine. We\'ll definitely be back!'
    }
  ];

  return (
    <div className='mt-16 md:mt-20'>
      {/* Hero Section */}
      <div className='relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-gradient-to-r from-[#54201c] to-[#8b3226] py-20 md:py-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 text-center max-w-4xl'>
          <h1 className='font-playfair text-4xl md:text-6xl font-bold mb-6'>
            Experiences Beyond Accommodation
          </h1>
          <p className='text-lg md:text-xl text-gray-100 mb-8'>
            Every stay is a story. Make yours unforgettable with our curated experiences 
            designed to delight, inspire, and create lasting memories.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
            className='bg-white text-[#54201c] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg'
          >
            Discover More
          </button>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white'>
        <div className='mb-12'>
          <Title 
            title="What We Offer" 
            subTitle="Thoughtfully crafted experiences that go beyond the ordinary" 
            align="center"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className='group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className={`${experience.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <img src={experience.icon} alt={experience.title} className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>{experience.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{experience.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Experience Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
              Immerse Yourself in Luxury
            </h2>
            <p className='text-gray-600 mb-6 leading-relaxed'>
              At EliteNest, we believe that travel is about more than just a place to sleep. 
              It's about the experiences that enrich your journey and create stories worth sharing.
            </p>
            <p className='text-gray-600 mb-6 leading-relaxed'>
              From the moment you arrive, you'll be surrounded by thoughtful touches designed 
              to make you feel at home while exploring the extraordinary. Our team is passionate 
              about helping you discover the best of the destination, whether that's a hidden 
              café, a stunning viewpoint, or a local artisan market.
            </p>
            <div className='grid grid-cols-2 gap-6 mt-8'>
              <div className='text-center p-6 bg-white rounded-xl shadow-md'>
                <h3 className='text-4xl font-bold text-[#54201c] mb-2'>50+</h3>
                <p className='text-gray-600'>Curated Experiences</p>
              </div>
              <div className='text-center p-6 bg-white rounded-xl shadow-md'>
                <h3 className='text-4xl font-bold text-[#54201c] mb-2'>24/7</h3>
                <p className='text-gray-600'>Personalized Service</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <img 
              src={assets.roomImg1} 
              alt='Experience 1' 
              className='rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-300'
            />
            <img 
              src={assets.roomImg2} 
              alt='Experience 2' 
              className='rounded-2xl shadow-lg w-full h-64 object-cover mt-8 hover:scale-105 transition-transform duration-300'
            />
            <img 
              src={assets.roomImg3} 
              alt='Experience 3' 
              className='rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-300'
            />
            <img 
              src={assets.roomImg4} 
              alt='Experience 4' 
              className='rounded-2xl shadow-lg w-full h-64 object-cover mt-8 hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>

      {/* Guest Stories Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white'>
        <div className='mb-12'>
          <Title 
            title="Guest Stories" 
            subTitle="Hear what makes our experiences truly special from those who've lived them" 
            align="center"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className='bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300'
            >
              <div className='flex items-center mb-6'>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className='w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#54201c]'
                />
                <div>
                  <h4 className='font-bold text-gray-800'>{testimonial.name}</h4>
                  <p className='text-sm text-gray-500'>{testimonial.location}</p>
                  <div className='flex mt-1'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <img key={i} src={assets.starIconFilled} alt='star' className='w-4 h-4' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='text-gray-600 leading-relaxed italic'>
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20 bg-gradient-to-r from-[#54201c] to-[#8b3226] text-white'>
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mb-6'>
            Ready to Create Your Story?
          </h2>
          <p className='text-lg text-gray-100 mb-8'>
            Book your next stay and discover experiences that will stay with you long after you check out.
          </p>
          <button 
            onClick={() => window.location.href = '/rooms'}
            className='bg-white text-[#54201c] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105'
          >
            Explore Our Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
