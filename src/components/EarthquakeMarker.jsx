import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// custom marker by magnitude
const getMarkerIcon = (mag) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background:${mag >= 6 ? "red" : mag >= 4 ? "orange" : "green"};
      width:20px;height:20px;border-radius:50%;border:2px solid white;">
    </div>`,
  });

export default function EarthquakeMarker({ quake }) {
  const [lng, lat] = quake.geometry.coordinates;
  return (
    <Marker position={[lat, lng]} icon={getMarkerIcon(quake.properties.mag)}>
      <Popup>
        <strong>Mag {quake.properties.mag}</strong>
        <br />
        {quake.properties.place}
        <br />
        {new Date(quake.properties.time).toLocaleString()}
      </Popup>
    </Marker>
  );
}
