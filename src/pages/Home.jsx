import { useState, useEffect } from 'react';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaMapMarkerAlt, FaPalette, FaChevronDown } from 'react-icons/fa';
import { GiNeedleDrill, GiInkSwirl, GiDragonSpiral } from 'react-icons/gi';

export default function Home({ onNavigate }) {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-5 md:top-20 md:left-20 text-4xl md:text-8xl rotate-12 animate-pulse">
                        <img src="/tatto-bg-1.png" alt="..." className="w-16 h-16 md:w-100 md:h-100 object-cover" />
                    </div>
                    <div className="absolute bottom-20 right-5 md:bottom-40 md:right-32 text-5xl md:text-9xl -rotate-12 animate-pulse delay-300">
                        <img src="/tatto-bg-2.png" alt="..." className="w-20 h-20 md:w-130 md:h-130 object-cover" />
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className={`relative z-10 text-center px-4 md:px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Logo/Title with Gothic Font */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6 tracking-wider text-zinc-100 drop-shadow-2xl"
                        style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
                        <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 text-zinc-400 tracking-widest">Tattoo Studio</span>
                        <img src="/logo-b-nof.png" alt="" className='w-32 h-32 sm:w-40 sm:h-40 md:w-140 md:h-140 mx-auto' />
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 mb-8 md:mb-12 tracking-wide max-w-2xl mx-auto px-4">
                        Arte permanente en tu piel
                    </p>

                    <button
                        onClick={onNavigate}
                        className="group relative mt-8 md:mt-16 px-8 sm:px-10 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold tracking-wider border-2 border-zinc-100 text-zinc-100 overflow-hidden transition-all duration-500 hover:scale-105"
                    >
                        <span className="relative z-10 group-hover:text-zinc-950 transition-colors duration-500">
                            RESERVAR CITA
                        </span>
                        <span className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                    </button>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 md:bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <FaChevronDown className="text-zinc-100 text-2xl md:text-4xl opacity-90" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className={`transition-all duration-1000 delay-200 ${scrollY > 300 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <span className="text-zinc-600 text-xs sm:text-sm tracking-[0.3em] font-semibold mb-3 md:mb-4 block">Ex carne, lapis.</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>
                            SOBRE NOSOTROS
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                            Bienvenido a Lithos Tattoo Studio, donde cada diseño cuenta una historia única.
                            Transformamos tus ideas en obras de arte que llevarás contigo para siempre.
                        </p>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                            Nuestros artistas combinan técnica profesional, creatividad y pasión para crear
                            tatuajes personalizados que reflejan tu esencia y estilo personal.
                        </p>
                    </div>

                    <div className={`relative transition-all duration-1000 delay-400 ${scrollY > 300 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="bg-zinc-900 border-2 md:border-4 border-zinc-800 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                                <img src="/publicidad/am-1.jpeg" alt="" className='w-full h-48 sm:h-64 md:h-200 object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services/Pricing Section */}
            <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-zinc-600 text-xs sm:text-sm tracking-[0.3em] font-semibold mb-3 md:mb-4 block">Pretium permanens.</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-4 md:mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
                            Lista de Precios
                        </h2>
                        <p className="text-zinc-500 text-xs sm:text-sm">*Los precios pueden variar según complejidad del diseño</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                        {[
                            {
                                category: 'Tatuajes', services: [
                                    { name: 'Tatuaje pequeño (hasta 5cm)', price: '$25.000' },
                                    { name: 'Tatuaje mediano (5-10cm)', price: '$45.000' },
                                    { name: 'Tatuaje grande (10-20cm)', price: '$80.000' },
                                    { name: 'Sesión por hora', price: '$30.000/h' }
                                ]
                            },

                            {
                                category: 'Servicios Adicionales', services: [
                                    { name: 'Cover-up (tapado)', price: 'Desde $50.000' },
                                    { name: 'Restauración de tatuaje', price: '$35.000' },
                                    { name: 'Diseño personalizado', price: '$15.000' },
                                    { name: 'Consulta y boceto', price: 'Gratis' }
                                ]
                            },
                        ].map((category, idx) => (
                            <div key={idx} className="border-t-2 border-zinc-800 pt-6 md:pt-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-zinc-300 mb-6 md:mb-8 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                                    {category.category}
                                </h3>
                                <div className="space-y-3 md:space-y-4">
                                    {category.services.map((service, sIdx) => (
                                        <div key={sIdx} className="flex justify-between items-baseline border-b border-zinc-900 pb-2 md:pb-3 hover:border-zinc-700 transition-colors">
                                            <span className="text-zinc-400 text-xs sm:text-sm">{service.name}</span>
                                            <span className="text-zinc-200 text-sm sm:text-base font-semibold tracking-wider whitespace-nowrap ml-2">{service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16 text-center px-4">
                        <div className="inline-block bg-zinc-900 border border-zinc-800 px-6 sm:px-8 py-4 sm:py-6 max-w-2xl">
                            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                <span className="text-zinc-300 font-semibold">Seña requerida:</span> Para reservar tu cita se requiere una seña del 30% del presupuesto total.
                                La seña se descuenta del precio final del tatuaje.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio/Work Section */}
            <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-zinc-600 text-xs sm:text-sm tracking-[0.3em] font-semibold mb-3 md:mb-4 block">Quod spectas, manet.</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>
                            Nuestros Trabajos
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-square bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all duration-500"
                            >
                                <img
                                    src={`/publicidad/gy-${idx + 1}.jpeg`}
                                    alt={`Trabajo ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-zinc-100 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-zinc-600 text-xs sm:text-sm tracking-[0.3em] font-semibold mb-3 md:mb-4 block">Respice si audes.</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-6 md:mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
                        Contacto
                    </h2>

                    <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                        <p className="text-xl sm:text-2xl text-zinc-400">+54 9 11 3926-9642</p>
                        <p className="text-zinc-600 flex items-center justify-center gap-2 text-sm sm:text-base">
                            <FaMapMarkerAlt /> Banfield, Buenos Aires, Argentina
                        </p>
                    </div>

                    <div className="flex justify-center gap-4 md:gap-6 mb-12 md:mb-16">
                        <a href="#" className="w-10 h-10 md:w-12 md:h-12 border border-zinc-800 flex items-center justify-center hover:border-zinc-100 hover:text-zinc-100 transition-all duration-300">
                            <FaInstagram size={18} className="md:w-5 md:h-5" />
                        </a>
                        <a href="https://wa.me/+5491139269642" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 border border-zinc-800 flex items-center justify-center hover:border-zinc-100 hover:text-zinc-100 transition-all duration-300">
                            <FaWhatsapp size={18} className="md:w-5 md:h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 md:w-12 md:h-12 border border-zinc-800 flex items-center justify-center hover:border-zinc-100 hover:text-zinc-100 transition-all duration-300">
                            <FaFacebookF size={18} className="md:w-5 md:h-5" />
                        </a>
                    </div>

                    <button
                        onClick={onNavigate}
                        className="group relative px-10 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold tracking-widest border-2 border-zinc-100 text-zinc-100 overflow-hidden transition-all duration-500 hover:scale-105"
                    >
                        <span className="relative z-10 group-hover:text-zinc-950 transition-colors duration-500">
                            RESERVAR AHORA
                        </span>
                        <span className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                    </button>
                </div>
            </section>

            {/* Footer */}


            {/* Google Fonts Import */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');
      `}</style>
        </div>
    );
}