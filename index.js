const express = require("express");
const { port } = require("./config");

const apiRoutes = require("./routes");
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static("public"));

app.use("/", apiRoutes);

app.use(function (request, response, next) {
  response.status(404).json({
    status: "error",
    message: `Cannot ${request.method} ${request.path}`
  });
});

app.listen(port, () => {
  console.log(`***** \nServer running on port ${port}\n*****`);
});
