import BaseChannel from "./BaseChannel.js";

class GameChannel extends BaseChannel {
  listen() {
    this.socket.on("join-game", (message) => {
      const { gameId, playerId } = message;
      this.playerId = playerId;
      this.gameId = gameId;

      this.join();
    });
  }

  join() {
    if (!this.gameId) throw new Error("GameIDNotDefined");
    if (!this.playerId) throw new Error("PlayerIDNotDefined");

    this.socket.join(this.gameId);
    this.socket.emit("joined-game", {
      playerId: this.playerId,
      gameId: this.gameId,
      joined: true,
    });

    this.logger.info(`player ${this.playerId} joined ${this.gameId}`);
  }
}

export default GameChannel;
