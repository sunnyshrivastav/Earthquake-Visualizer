import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import FilterPanel from "../components/FilterPanel";
import Charts from "../components/Charts";
import EarthquakeList from "../components/EarthquakeList";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [quakes, setQuakes] = useState([]);
  const [minMag, setMinMag] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ call your Express backend
        const res = await fetch(
          `http://localhost:5000/api/earthquakes?minMag=${minMag}`
        );
        const data = await res.json();
        setQuakes(data);
      } catch (err) {
        console.error("Error fetching earthquakes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [minMag]);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } flex h-screen relative`}
    >
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-1/3 p-4 overflow-y-auto absolute md:relative z-10 h-full
          ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
          🌍 Earthquake Visualizer
          <button
            className="md:hidden p-2 bg-gray-300 dark:bg-gray-600 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </h1>

        {/* Filters */}
        <FilterPanel
          minMag={minMag}
          setMinMag={setMinMag}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Charts */}
        <Charts quakes={quakes} />

        {/* Earthquake list */}
        <EarthquakeList
          quakes={quakes}
          loading={loading}
          onSelect={setSelectedCoords}
        />
      </div>

      {/* Mobile toggle */}
      {!sidebarOpen && (
        <button
          className="absolute top-4 left-4 z-20 p-2 bg-gray-200 dark:bg-gray-700 rounded md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Map */}
      <div className="flex-1 ">
        <MapView
          quakes={quakes}
          selectedCoords={selectedCoords}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
