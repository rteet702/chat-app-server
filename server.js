const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/test.routes")(app);

const io = new Server(server, {
    cors: {
        origin: "https://chatapp-teets-dev.herokuapp.com/",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("a user connected.");

    socket.on("disconnect", () => {
        console.log("a user disconnected.");
    });

    socket.on("test", () => {
        io.emit("all_user_test", { property: "Hi!" });
    });
});

server.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
