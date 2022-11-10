const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/test.routes")(app);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
