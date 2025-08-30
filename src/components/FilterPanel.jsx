export default function FilterPanel({ minMag, setMinMag, darkMode, setDarkMode }) {
  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <label className="block mb-2 font-semibold">Min Magnitude</label>
      <input
        type="number"
        value={minMag}
        onChange={(e) => setMinMag(Number(e.target.value))}
        className="w-full p-2 border rounded mb-4 text-black"
      />
    </div>
  );
}
