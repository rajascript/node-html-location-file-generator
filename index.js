const app = require("express")();
const fs = require("fs");
const bodyParser = require("body-parser");
const createHtmlTemplate = function createHtmlTemplate(validLocation) {
  //html template to be saved inside file
  return `<html>
        <body>
        <div>
        ${validLocation}
        </div>
        </body>
    </html>`;
};
const isLocationValid = function isLocationVaid(location) {
  if (location && typeof location === "string") {
    return true;
  } else return false;
};
//cors setup

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
fetch;
//cors setup
app.use(bodyParser.json());

app.post("/api/save_location_html_file", (req, res) => {
  console.log(req.body);
  const { location } = req.body;
  if (isLocationValid(location)) {
    let htmlTemplate = createHtmlTemplate(location);
    const filename = `${Date.now()}_${location}.html`;
    fs.writeFile(filename, htmlTemplate, err => {
      if (err) console.log(err);
      else
        res
          .status(200)
          .json({ filename, message: "File created successfully." });
    });
  } else {
    res
      .status(403)
      .json({ errorMessage: "location is a required 'String' field" });
  }
});

app.listen(3000);
