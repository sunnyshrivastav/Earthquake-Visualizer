import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // ✅ keep this if Node <18, else remove

const app = express();
const PORT = 5000;

app.use(cors());

// API endpoint
app.get("/api/earthquakes", async (req, res) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = await response.json();

    // Optional filtering
    const minMag = parseFloat(req.query.minMag) || 0;
    const filtered = data.features.filter(
      (quake) => quake.properties.mag >= minMag
    );

    res.json(filtered);
  } catch (err) {
    console.error("Error fetching earthquake data:", err);
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
