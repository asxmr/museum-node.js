const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const albumRoutes = require("./routes/albums.routes");
const photoRoutes = require("./routes/photos.routes");
const { HttpError } = require("./middleware/httpError");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.type("html").send(`
    <h1>Black & White Museum API</h1>
    <p>Database-driven REST API (Node.js + Express + Prisma + SQLite).</p>

    <h2>Albums</h2>
    <ul>
      <li><b>GET</b> /albums?limit=20&offset=0&search=term&sort=createdAt&order=desc</li>
      <li><b>GET</b> /albums/:id</li>
      <li><b>POST</b> /albums</li>
      <li><b>PUT</b> /albums/:id</li>
      <li><b>DELETE</b> /albums/:id</li>
    </ul>

    <h2>Photos</h2>
    <ul>
      <li><b>GET</b> /photos?limit=10&offset=0&search=term&sort=createdAt&order=desc&albumId=1</li>
      <li><b>GET</b> /photos/:id</li>
      <li><b>POST</b> /photos</li>
      <li><b>PUT</b> /photos/:id</li>
      <li><b>DELETE</b> /photos/:id</li>
    </ul>
  `);
});

app.use("/albums", albumRoutes);
app.use("/photos", photoRoutes);

app.use((req, res, next) => {
  next(new HttpError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (status >= 500) console.error(err);

  res.status(status).json({
    error: err.message || "Internal server error",
    details: err.details || null,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
