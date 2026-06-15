require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const dns = require("dns");


dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});