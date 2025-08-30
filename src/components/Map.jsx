import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import { useEffect } from "react";

const center = [-34.737194, -58.4400156]; // ubicación central
const radius = 3000; // radio en metros

function SetView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 14);
  }, [coords, map]);
  return null;
}

export default function Map({ onGeocoderReady }) {
  useEffect(() => {
    // Leaflet no tiene geocoder nativo, pero podemos usar Nominatim de OSM
    // para geocodificación si quieres implementar "verificarDireccion"
    if (onGeocoderReady) onGeocoderReady(); 
  }, [onGeocoderReady]);

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ width: "100%", height: "200px" }}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={center} radius={radius} pathOptions={{ color: "red", fillOpacity: 0.3 }} />
      <SetView coords={center} />
    </MapContainer>
  );
}
