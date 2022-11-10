const express = require("express");
const cors = require("cors");
const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
