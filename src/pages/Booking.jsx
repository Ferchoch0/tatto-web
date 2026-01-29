import { FaArrowLeft } from 'react-icons/fa';
import { GiRazor } from 'react-icons/gi';
import TattooTurnForm from '../components/TurnForm';

export default function Booking({ onNavigate }) {
  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-9xl rotate-12 animate-pulse">
            <img src="/tatto-bg-1.png" alt="" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={onNavigate}
            className="flex items-center gap-3 text-zinc-400 hover:text-zinc-100 transition-colors duration-300 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="tracking-wider">Volver</span>
          </button>
          
          <h1 className="text-3xl font-bold text-zinc-100 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
            <img src="/logo-b-nof.png" alt="Lithos Studio Logo" className="w-30 h-30" />
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-6xl md:text-7xl font-bold text-zinc-100 mb-6 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
              Reservar Turno
            </h2>
            <p className="text-xl text-zinc-400 tracking-wide">
              Completa el formulario y confirma tu cita vía WhatsApp
            </p>
            <div className="w-24 h-1 bg-zinc-800 mx-auto mt-8"></div>
          </div>

          {/* Form Component */}
          <div className="animate-slideUp" style={{ animationDelay: '200ms' }}>
            <TattooTurnForm />
          </div>
        </div>
      </main>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}