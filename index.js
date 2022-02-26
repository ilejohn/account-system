const { port } = require("./config");
const app = require("./app");

app.listen(port, () => {
  console.log(`***** \nServer running on port ${port}\n*****`);
});
