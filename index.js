const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routesAPI = require("./routes/api");
const routesWeb = require("./routes/web");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(routesWeb);
app.use("/api/", routesAPI);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
