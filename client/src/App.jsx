import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import SsoCallback from './pages/SsoCallback';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import ManageAccount from './pages/ManageAccount';

const AppContent = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');
  const isAuthPath = ['/login', '/signup', '/verify-email', '/sso-callback'].includes(location.pathname);

  return (
    <div>
      {!isOwnerPath && !isAuthPath && <Navbar />}
      {false && <HotelReg />}
      <div className={isAuthPath ? '' : 'min-h-[70vh]'}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/verify-email" element={<VerifyEmail />}/>
          <Route path="/sso-callback" element={<SsoCallback />} />
          <Route path="/rooms" element={<AllRooms />}/>
          <Route path="/rooms/:id" element={<RoomDetails />}/>
          <Route path="/my-bookings" element={<MyBookings />}/>
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
          <Route path="/account" element={<ManageAccount />} />
        </Routes>
      </div>
      {!isAuthPath && <Footer />}
    </div>
  )
}

const App = () => {
  return <AppContent />;
}

export default App;