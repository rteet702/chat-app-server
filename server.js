const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const MessageController = require("./controllers/message.controller");

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(
    cors({
        origins: "*:*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
});

io.on("connection", async (socket) => {
    console.log("a user connected");

    // socket.emit("getMessages", { messages });
    socket.emit("getMessages", {
        messages: await MessageController.findAll(),
    });

    // socket.on("new_message", ({ content, author }) => {
    //     messages.push({ author, content });
    //     io.emit("getMessages", { messages });
    // });
    socket.on("new_message", async ({ content, author }) => {
        await MessageController.send(author, content);
        io.emit("getMessages", {
            messages: await MessageController.findAll(),
        });
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected.");
    });
});

server.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
