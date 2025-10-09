import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const About = () => {
  const values = [
    {
      icon: assets.heartIcon,
      title: 'Hospitality First',
      description: 'We believe in treating every guest like family, with warmth, respect, and genuine care.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: assets.badgeIcon,
      title: 'Quality Excellence',
      description: 'From our rooms to our service, we maintain the highest standards in everything we do.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: assets.mountainIcon,
      title: 'Authentic Experiences',
      description: 'We connect you with the soul of each destination through curated local experiences.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: assets.starIconFilled,
      title: 'Sustainable Luxury',
      description: 'Luxury and sustainability go hand in hand in our eco-conscious operations.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const team = [
    {
      name: 'Hikmi Ahmed',
      role: 'Founder & CEO',
      image: assets.hikmi,
      bio: 'With 15 years in hospitality, Hikmi founded EliteNest to redefine luxury travel.'
    },
    {
      name: 'Nazri Hassan',
      role: 'Director of Operations',
      image: assets.nazri,
      bio: 'Nazri ensures every detail of your stay exceeds expectations with precision and care.'
    },
    {
      name: 'Tsita Mengistu',
      role: 'Head of Guest Experience',
      image: assets.tsita,
      bio: 'Tsita creates memorable moments that turn guests into lifelong friends.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'EliteNest Founded', description: 'Our journey began with a single hotel and a vision' },
    { year: '2020', event: '10 Properties', description: 'Expanded across major cities worldwide' },
    { year: '2022', event: '50,000+ Happy Guests', description: 'Reached a milestone in guest satisfaction' },
    { year: '2025', event: 'Award Winning', description: 'Recognized as Best Boutique Hotel Chain' }
  ];

  return (
    <div className='mt-16 md:mt-20'>
      {/* Hero Section */}
      <div className='relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-gradient-to-r from-[#54201c] via-[#6d2a22] to-[#54201c] py-20 md:py-32 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
        </div>
        <div className='relative z-10 text-center max-w-4xl'>
          <h1 className='font-playfair text-4xl md:text-6xl font-bold mb-6'>
            Our Story, Your Comfort
          </h1>
          <p className='text-lg md:text-xl text-gray-100 leading-relaxed'>
            EliteNest was born from a simple belief: that every journey deserves a 
            home away from home. A place where comfort meets elegance, and where 
            every guest feels genuinely welcomed.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='order-2 lg:order-1'>
            <img 
              src={assets.hero} 
              alt='EliteNest Hotel' 
              className='rounded-2xl shadow-2xl w-full h-[500px] object-cover'
            />
          </div>
          <div className='order-1 lg:order-2'>
            <div className='mb-10'>
              <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                Our Mission
              </h2>
              <p className='text-gray-600 leading-relaxed text-lg'>
                To create exceptional hospitality experiences that feel personal, 
                authentic, and unforgettable. We're not just providing rooms—we're 
                crafting memories that last a lifetime.
              </p>
            </div>
            <div>
              <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                Our Vision
              </h2>
              <p className='text-gray-600 leading-relaxed text-lg'>
                To be the world's most loved boutique hotel brand, known for our 
                warmth, attention to detail, and commitment to making every stay 
                feel like coming home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white'>
        <div className='mb-12'>
          <Title 
            title="Our Core Values" 
            subTitle="The principles that guide everything we do" 
            align="center"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
          {values.map((value, index) => (
            <div 
              key={index}
              className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <img src={value.icon} alt={value.title} className='w-8 h-8 brightness-0 invert' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>{value.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white'>
        <div className='mb-12'>
          <Title 
            title="Our Journey" 
            subTitle="Milestones that shaped who we are today" 
            align="center"
          />
        </div>

        <div className='max-w-4xl mx-auto mt-12'>
          {milestones.map((milestone, index) => (
            <div key={index} className='relative pl-8 pb-12 border-l-2 border-[#54201c] last:pb-0'>
              <div className='absolute left-[-9px] top-0 w-4 h-4 bg-[#54201c] rounded-full'></div>
              <div className='bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center gap-4 mb-2'>
                  <span className='text-2xl font-bold text-[#54201c]'>{milestone.year}</span>
                  <h3 className='text-xl font-bold text-gray-800'>{milestone.event}</h3>
                </div>
                <p className='text-gray-600'>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white'>
        <div className='mb-12'>
          <Title 
            title="Meet Our Team" 
            subTitle="The passionate people behind your exceptional experiences" 
            align="center"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
          {team.map((member, index) => (
            <div 
              key={index}
              className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
            >
              <div className='relative overflow-hidden'>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
              </div>
              <div className='p-6'>
                <h3 className='text-2xl font-bold text-gray-800 mb-1'>{member.name}</h3>
                <p className='text-[#54201c] font-semibold mb-3'>{member.role}</p>
                <p className='text-gray-600 leading-relaxed'>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20 bg-gradient-to-r from-[#54201c] to-[#8b3226] text-white'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='text-center'>
            <h3 className='text-4xl md:text-5xl font-bold mb-2'>25+</h3>
            <p className='text-gray-200'>Premium Properties</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl md:text-5xl font-bold mb-2'>50K+</h3>
            <p className='text-gray-200'>Happy Guests</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl md:text-5xl font-bold mb-2'>15+</h3>
            <p className='text-gray-200'>Countries</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl md:text-5xl font-bold mb-2'>4.9★</h3>
            <p className='text-gray-200'>Average Rating</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
            Become Part of Our Story
          </h2>
          <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
            Join thousands of travelers who've made EliteNest their home away from home. 
            Your next adventure awaits.
          </p>
          <button 
            onClick={() => window.location.href = '/rooms'}
            className='bg-gradient-to-r from-[#54201c] to-[#8b3226] text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
          >
            Book Your Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
