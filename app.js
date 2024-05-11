import http from "http";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";
import logger from "./utils/logger.js";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
let httpServer;

app.use(express.json());

app.get("/api/healthz", async (_req, res, _next) => {
  res.json({ data: "I'm healthy here!" });
});

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

  httpServer = https.createServer(options, app);

  initializeSocketServer(httpServer);

  httpServer.listen(SSL_PORT, () => {
    logger.info(`[INFO] api.skap.mcgi.app is listening on port ${SSL_PORT}`);
  });
} else {
  httpServer = http.createServer({}, app);

  initializeSocketServer(httpServer);

  httpServer.listen(PORT);
}
