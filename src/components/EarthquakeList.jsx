export default function EarthquakeList({ quakes, loading, onSelect }) {
  if (loading) return <p className="text-center text-gray-600">⏳ Loading earthquakes...</p>;

  return (
    <ul>
      {quakes.map((q, i) => (
        <li
          key={i}
          onClick={() => onSelect([q.geometry.coordinates[1], q.geometry.coordinates[0]])}
          className="mb-3 p-3 bg-white dark:bg-gray-700 shadow rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800"
        >
          <strong>Mag {q.properties.mag}</strong> — {q.properties.place}
          <br />
          {new Date(q.properties.time).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
