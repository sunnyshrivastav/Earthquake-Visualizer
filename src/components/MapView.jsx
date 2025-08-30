import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // ✅ needed for proper sizing & styling
import EarthquakeMarker from "./EarthquakeMarker";
import { useEffect } from "react";

// Fly animation helper
function FlyToLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 5, { duration: 2 });
  }, [coords, map]);
  return null;
}

// Zoom bottom-right
function AddZoomControl() {
  const map = useMap();
  useEffect(() => {
    L.control.zoom({ position: "bottomright" }).addTo(map);
  }, [map]);
  return null;
}

export default function MapView({ quakes, selectedCoords, darkMode }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
      style={{ background: darkMode ? "#1a202c" : "white" }} // ✅ matches old behavior
    >
      <TileLayer
        url={
          darkMode
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Earthquake Markers */}
      {quakes.map((q, i) => (
        <EarthquakeMarker key={i} quake={q} />
      ))}

      <FlyToLocation coords={selectedCoords} />
      <AddZoomControl />
    </MapContainer>
  );
}
