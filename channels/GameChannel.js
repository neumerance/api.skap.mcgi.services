import BaseChannel from "./BaseChannel.js";

class GameChannel extends BaseChannel {
  listen() {
    this.socket.on("join-game", (message) => {
      const { gameId, playerId } = message;
      this.gameId = gameId;

      this.join();
    });
  }

  join() {
    if (!this.gameId) throw new Error("GameIDNotDefined");

    this.socket.join(this.gameId);
    this.socket.emit("joined-game", {
      gameId: this.gameId,
      joined: true,
    });

    this.logger.info(`a new player have joine game #${this.gameId}`);
  }
}

export default GameChannel;
