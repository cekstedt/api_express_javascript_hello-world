const app = require('./app.js');
const dotenv = require("dotenv");
dotenv.config();

const PORT = parseInt(process.env.PORT, 10);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Docs are available on http://localhost:${PORT}/api/docs`);
  });