import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { getDistance } from "geolib";
import axios from "axios";

const LOCAL_COORDS = { lat: -34.737194, lng: -58.4400156 };
const RADIUS = 3000; // 3 km

export default function TurnForm() {
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [homeService, setHomeService] = useState(false);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const verificarDireccion = async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        direction
      )}&format=json&limit=1`;
      const res = await axios.get(url, { headers: { "Accept-Language": "es" } });
      if (res.data.length === 0) {
        alert("No se encontró la dirección.");
        return false;
      }

      const coords = {
        lat: parseFloat(res.data[0].lat),
        lng: parseFloat(res.data[0].lon),
      };

      const distance = getDistance(LOCAL_COORDS, coords); // metros
      if (distance > RADIUS) {
        alert("La dirección está fuera del rango (3 km).");
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      alert("Error verificando la dirección.");
      return false;
    }
  };

  const sendWhatsApp = async () => {
    if (!date || !service) {
      alert("Por favor completa la fecha y selecciona un servicio.");
      return;
    }

    if (homeService && !direction.trim()) {
      alert("Por favor indica una dirección para el servicio a domicilio.");
      return;
    }

    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
    const messageBase = `Hola, quiero agendar un turno el ${formattedDate} para el servicio de: ${service}.`;

    if (homeService) {
      const isValid = await verificarDireccion();
      if (!isValid) return;
      const message = `${messageBase} Servicio a domicilio en: ${direction}.`;
      window.open(`https://wa.me/+541161248952?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      window.open(`https://wa.me/+541161248952?text=${encodeURIComponent(messageBase)}`, "_blank");
    }
  };

  return (
    <form id="turn-form" onSubmit={(e) => e.preventDefault()}>
      <ArticleTitle />
      <DatePicker date={date} setDate={setDate} />
      <ServiceSelector service={service} setService={setService} />
      <MapSection />
      <HomeServiceInput
        homeService={homeService}
        setHomeService={setHomeService}
        direction={direction}
        setDirection={setDirection}
      />
      <SendButton sendWhatsApp={sendWhatsApp} />
    </form>
  );
}



// ----------------- COMPONENTES -----------------

function ArticleTitle() {
  return (
    <article>
      <h2>Agenda tu Turno!</h2>
    </article>
  );
}

function DatePicker({ date, setDate }) {
  return (
    <>
      <label htmlFor="date">Fecha:</label>
      <section className="form-group">
        <input
          type="date"
          id="date"
          className="input"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </section>
    </>
  );
}

function ServiceSelector({ service, setService }) {
  const services = [
    { label: "Corte", icon: "fa6-solid--scissors" },
    { label: "Corte & Barba", icon: "fa6-solid--scissors" },
    { label: "Global", icon: "fa6-solid--fire-flame-simple" },
    { label: "Cuspide", icon: "fa6-solid--pump-soap" },
    { label: "Claritos", icon: "tabler--bulb-filled" },
    { label: "Mechas", icon: "tabler--bulb-filled" },
  ];

  return (
    <>
      <label>Servicio:</label>
      <section className="form-group">
        <div className="radio-inputs">
          {services.map((s) => (
            <label key={s.label}>
              <input
                className="radio-input"
                type="radio"
                name="service"
                checked={service === s.label}
                onChange={() => setService(s.label)}
              />
              <span className="radio-tile">
                <span className="radio-icon">
                  <span className={s.icon}></span>
                </span>
                <span className="radio-label">{s.label}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
    </>
  );
}

function MapSection() {
  return (
    <article>
      <MapContainer
        center={[LOCAL_COORDS.lat, LOCAL_COORDS.lng]}
        zoom={14}
        style={{ width: "100%", height: "200px" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle
          center={[LOCAL_COORDS.lat, LOCAL_COORDS.lng]}
          radius={RADIUS}
          pathOptions={{ color: "red", fillOpacity: 0.3 }}
        />
      </MapContainer>
    </article>
  );
}

function HomeServiceInput({ homeService, setHomeService, direction, setDirection }) {
  return (
    <>
      <label className="container-check">
        <input
          type="checkbox"
          className="input"
          id="home-service"
          checked={homeService}
          onChange={(e) => setHomeService(e.target.checked)}
        />
        <span className="custom-checkbox"></span>
        <span className="check-text">¿A Domicilio?</span>
      </label>

      <section
        className={`form-group ${homeService ? "show" : ""}`}
        id="content-direction"
      >
        <input
          type="text"
          placeholder="Dirección"
          id="direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        />
      </section>
    </>
  );
}

function SendButton({ sendWhatsApp }) {
  return (
    <section className="form-group">
      <button type="button" id="send-wsp" onClick={sendWhatsApp}>
        Reservar via WhatsApp
      </button>
    </section>
  );
}
