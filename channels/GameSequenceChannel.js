import BaseChannel from "./BaseChannel.js";

class GameSequenceChannel extends BaseChannel {
  listen() {
    this.socket.on("new-sequence", (message) => {
      const { gameId } = message;

      this.socket.to(gameId).emit("render-sequence", message);
    });
  }
}

export default GameSequenceChannel;
