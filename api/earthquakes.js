// api/earthquakes.js
import fetch from "node-fetch"; // If using Node <18 on Vercel. Otherwise, remove.

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = await response.json();

    const minMag = parseFloat(req.query.minMag) || 0;
    const filtered = data.features.filter(
      (quake) => quake.properties.mag >= minMag
    );

    res.status(200).json(filtered);
  } catch (err) {
    console.error("Error fetching earthquake data:", err);
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
}
