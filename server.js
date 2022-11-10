const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

const users = [];

app.use(
    cors({
        origins: "*:*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/test.routes")(app);

const io = new Server(server, {
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");

    console.log(socket.handshake.auth);

    socket.on("disconnect", () => {
        console.log("a user disconnected.");
    });
});

server.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
