import React, { use } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router ,Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import AllRooms from './AllRooms';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/rooms" element={<AllRooms />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App