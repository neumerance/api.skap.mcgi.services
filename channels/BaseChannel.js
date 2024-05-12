import logger from "../utils/logger.js";

class BaseChannel {
  constructor(socket) {
    this.socket = socket;
    this.logger = logger;
  }

  listen() {
    throw new Error("NotImplementedError");
  }
}

export default BaseChannel;
