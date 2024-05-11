import http from "http";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;
let httpServer;

const initializeSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["*"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("connected");
  });
};

if (process.env.NODE_ENV === "production") {
  const SSL_PORT = 443;
  const options = {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("fullchain.pem"),
  };

  httpServer = https.createServer(options);

  initializeSocketServer(httpServer);

  httpServer.listen(SSL_PORT, () => {
    console.log(`[INFO] api.skap.mcgi.app is listening on port ${SSL_PORT}`);
  });
} else {
  httpServer = http.createServer();

  initializeSocketServer(httpServer);

  httpServer.listen(PORT);
}
