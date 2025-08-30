import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import StartScreen from "../components/StartScreen";
import Navbar from "../components/Navbar";
import TurnForm from "../components/TurnForm";
import Footer from "../components/Footer";

import { FaMapMarkerAlt, FaLaptopCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FaCut } from "react-icons/fa";

import "../styles/home.css";

function UserBar({ user, titleBar = "Corte de cabello", dateBar = "12 de Junio de 2024", distance = "A 18 km" }) {
    return (
        <div className="home-user-bar">
            <h2>Bienvenido, {user}</h2>
            <input type="text" className="home-user-input" placeholder="Buscar..." />
            <p>Tu ultima visita</p>
            <div className="home-user-last-visit">
                <div className="home-user-last-visit-info">
                    <h3>{titleBar}</h3>
                    <p>{dateBar}</p>
                    <span><FaMapMarkerAlt /> {distance}</span>
                </div>
                <button>Ir</button>
            </div>
        </div>
    );
}

function ServiceCard({ title, description, Icon }) {
    return (
        <div className="home-service-card">
            <div className="service-card-icon">
                <Icon size={48} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

const services = [
    {
        title: "Corte",
        description: "2 servicios",
        Icon: FaLaptopCode,
    },
    {
        title: "Barba",
        description: "8 servicios",
        Icon: FaMobileAlt,
    },
    {
        title: "Tintura",
        description: "5 servicios",
        Icon: RiTeamLine,
    },
    {
        title: "Color fantasia",
        description: "3 servicios",
        Icon: FaPaintBrush,
    },
];

function ServicesCarousel() {
    return (
        <div className="services-carousel">
            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                grabCursor={true}
                slidesPerView={"auto"}
                spaceBetween={16}
                observer={true}
                observeParents={true}
                watchSlidesProgress={true}
                resizeObserver={true}
            >
                {services.map((s, i) => (
                    <SwiperSlide key={i} className="service-slide">
                        <ServiceCard {...s} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

const barber = [
    {
        name: "Juan Perez",
        specialty: "Cortes modernos",
        nextAvailable: "Disponible el 15 de Junio",
    },

    {
        name: "Juan Perez",
        specialty: "Cortes modernos",
        nextAvailable: "Disponible el 15 de Junio",
    },

    {
        name: "Juan Perez",
        specialty: "Cortes modernos",
        nextAvailable: "Disponible el 15 de Junio",
    },
];

function AvalibleAppointments() {
    return (
        <div className="home-avalible-appointments">
            <div className="appointments-header">
                <h2>Turnos disponibles</h2>
            </div>
            <div className="appointments-list">
                {barber.map((b, i) => (
                    <div key={i} className="appointment-card">
                        <FaCut className="appointments-icon" />
                        <div className="appointment-barber-info">
                            <h3>{b.name}</h3>
                            <p>{b.specialty}</p>
                            <span>{b.nextAvailable}</span>
                        </div>
                        <button>Reservar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const [started, setStarted] = useState(false);

    return (
        <div className="app-container">
            {!started ? (
                <StartScreen onStart={() => setStarted(true)} />
            ) : (
                <div id="global">
                    <Navbar />
                    <UserBar user="Thiago" />
                    <main >

                        <div className="services-form">
                            <h2>Servicios</h2>
                            <ServicesCarousel />
                        </div>
                        {/* <TurnForm /> */}
                        <div className="home-avalible-barbers">
                            <AvalibleAppointments />
                        </div>
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    );
}
