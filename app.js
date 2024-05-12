import http from "http";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";
import logger from "./utils/logger.js";
import express from "express";
import { instrument } from "@socket.io/admin-ui";
import BuzzerChannel from "./channels/BuzzerChannel.js";
import GameChannel from "./channels/GameChannel.js";
import GameSequenceChannel from "./channels/GameSequenceChannel.js";

const PORT = process.env.PORT || 3000;
const app = express();
let httpServer;

app.use(express.json());

app.get("/api/healthz", async (_req, res, _next) => {
  res.json({ data: "I'm healthy here!" });
});

const initializeSocketServer = (httpServer, origin) => {
  const io = new Server(httpServer, {
    cors: { origin },
  });

  io.on("connection", (socket) => {
    logger.info(`connected ${socket.id}`);

    const gameChannel = new GameChannel(socket);
    gameChannel.listen();

    const buzzerChannel = new BuzzerChannel(socket);
    buzzerChannel.listen();

    const gameSequenceChannel = new GameSequenceChannel(socket);
    gameSequenceChannel.listen();
  });

  instrument(io, { auth: false });
};

if (process.env.NODE_ENV === "production") {
  const SSL_PORT = 443;
  const options = {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("fullchain.pem"),
  };

  const allowedOrigins = [
    "http://localhost:5173",
    "https://admin.socket.io",
    "https://skap.mcgi.services",
  ];
  httpServer = https.createServer(options, app);

  initializeSocketServer(httpServer), allowedOrigins;

  httpServer.listen(SSL_PORT, () => {
    logger.info(`[INFO] api.skap.mcgi.app is listening on port ${SSL_PORT}`);
  });
} else {
  httpServer = http.createServer({}, app);

  initializeSocketServer(httpServer, "*");

  httpServer.listen(PORT);
}
