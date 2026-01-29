import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { getDistance } from "geolib";
import axios from "axios";
import { FaMapMarkerAlt, FaPalette, FaEraser } from "react-icons/fa";
import { GiNeedleDrill, GiInkSwirl, GiDragonSpiral, GiRose, GiSkullCrossedBones, GiButterfly } from "react-icons/gi";

const LOCAL_COORDS = { lat: -34.737194, lng: -58.4400156 };
const RADIUS = 3000; // 3 km

export default function TattooTurnForm() {
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

      const distance = getDistance(LOCAL_COORDS, coords);
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
    const messageBase = `Hola, quiero agendar una cita el ${formattedDate} para: ${service}.`;

    if (homeService) {
      const isValid = await verificarDireccion();
      if (!isValid) return;
      const message = `${messageBase} Servicio a domicilio en: ${direction}.`;
      window.open(`https://wa.me/+5491139269642?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      window.open(`https://wa.me/+5491139269642?text=${encodeURIComponent(messageBase)}`, "_blank");
    }
  };

  const services = [
    { label: "Tatuaje Pequeño", Icon: GiButterfly },
    { label: "Tatuaje Mediano", Icon: GiRose },
    { label: "Tatuaje Grande", Icon: GiDragonSpiral },
    { label: "Cover-up", Icon: FaEraser },
    { label: "Diseño Personalizado", Icon: FaPalette },
    { label: "Restauración", Icon: GiInkSwirl },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
      {/* Date Picker */}
      <div className="mb-8 md:mb-10">
        <label
          htmlFor="date"
          className="block text-zinc-300 text-xs sm:text-sm tracking-widest uppercase mb-3 md:mb-4 font-semibold"
        >
          Fecha
        </label>
        <input
          type="date"
          id="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-zinc-950 border-2 border-zinc-800 text-zinc-100 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-base md:text-lg focus:outline-none focus:border-zinc-600 transition-colors duration-300"
          style={{
            colorScheme: 'dark'
          }}
        />
      </div>

      {/* Service Selector */}
      <div className="mb-8 md:mb-10">
        <label className="block text-zinc-300 text-xs sm:text-sm tracking-widest uppercase mb-4 md:mb-6 font-semibold">
          Tipo de Servicio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {services.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setService(s.label)}
              className={`
                relative p-4 sm:p-5 md:p-6 border-2 transition-all duration-300 group
                ${service === s.label
                  ? 'border-zinc-100 bg-zinc-950'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }
              `}
            >
              <div className={`
                flex flex-col items-center gap-2 md:gap-3 transition-transform duration-300
                ${service === s.label ? 'scale-105' : 'group-hover:scale-105'}
              `}>
                <s.Icon
                  size={28}
                  className={`
                    sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-300
                    ${service === s.label ? 'text-zinc-100' : 'text-zinc-600'}
                  `}
                />
                <span className={`
                  text-xs sm:text-sm tracking-wider font-semibold transition-colors duration-300 text-center leading-tight
                  ${service === s.label ? 'text-zinc-100' : 'text-zinc-400'}
                `}>
                  {s.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-8 md:mb-10">
        <label className="block text-zinc-300 text-xs sm:text-sm tracking-widest uppercase mb-3 md:mb-4 font-semibold">
          Área de cobertura
        </label>
        <div className="border-2 border-zinc-800 overflow-hidden">
          <MapContainer
            center={[LOCAL_COORDS.lat, LOCAL_COORDS.lng]}
            zoom={14}
            style={{ width: "100%", height: "200px" }}
            scrollWheelZoom={false}
            className="sm:h-[220px] md:h-[250px]"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle
              center={[LOCAL_COORDS.lat, LOCAL_COORDS.lng]}
              radius={RADIUS}
              pathOptions={{ color: "#71717a", fillColor: "#3f3f46", fillOpacity: 0.3 }}
            />
          </MapContainer>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={sendWhatsApp}
        className="group relative w-full py-4 sm:py-4.5 md:py-5 text-base md:text-lg font-semibold tracking-widest border-2 border-zinc-100 text-zinc-100 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 group-hover:text-zinc-950 transition-colors duration-500">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden xs:inline sm:inline">RESERVAR VIA WHATSAPP</span>
          <span className="xs:hidden sm:hidden">RESERVAR</span>
        </span>
        <span className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
      </button>

      <p className="text-center text-zinc-600 text-xs sm:text-sm mt-4 sm:mt-6 tracking-wide px-2">
        Te redirigiremos a WhatsApp para confirmar tu cita y discutir tu diseño
      </p>
    </div>
  );
}