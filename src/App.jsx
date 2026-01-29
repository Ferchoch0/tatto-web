import { useState } from 'react';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {currentPage === 'home' && <Home onNavigate={() => setCurrentPage('booking')} />}
      {currentPage === 'booking' && <Booking onNavigate={() => setCurrentPage('home')} />}
      <Footer />
    </div>
  );
}

export default App;