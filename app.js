import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;
const httpServer = createServer();
const io = new Server(httpServer, {

});

io.on("connection", (socket) => {
  logger.info("connected");
});

httpServer.listen(PORT);
