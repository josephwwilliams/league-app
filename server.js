const express = require("express");

// Initialize express
const app = express();

// Serve static build files from the "dist" directory
app.use(express.static("./dist/league-app"));

// Route incoming server requests to the correct files
app.get("/*", (_, res) =>
  res.sendFile("index.html", { root: "dist/league-app/" })
);

// Start the app on the default Heroku port
app.listen(process.env.PORT || 8080);
