const { socketIOServer } = require("./setup");

socketIOServer.on("connection", function (socket) {
    console.log(`Client ${socket.id} connected.`);

    socket.on("disconnecting", () => {
        console.log(`Client ${socket.id} disconnecting.`);
    });

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected.`);
    });

    timerInterval = setInterval(function () {
        socket.emit("hello", { time: new Date(), id: socket.id });
    }, (1000 * 2));
}) 