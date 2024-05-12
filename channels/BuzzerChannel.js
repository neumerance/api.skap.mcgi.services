import BaseChannel from "./BaseChannel.js";

class BuzzerChannel extends BaseChannel {
  listen() {
    this.socket.on("buzzer", (message) => {
      logger.info(`PlayerID ${message.playerId} pressed the buzzer first`);
      this.disableBuzzer(message);
    });

    this.socket.on("buzzer_enable", (message) => {
      this.enableBuzzer(message);
    });

    this.socket.on("buzzer_disable", (message) => {
      this.disableBuzzer(message);
    });

    this.socket.on("all_buzzer_enable", (message) => {
      this.enableAllBuzzers(message);
    });

    this.socket.on("all_buzzer_disable", (message) => {
      this.disableAllBuzzers(message);
    });
  }

  enableAllBuzzers(message) {
    const { gameId } = message;
    this.logger.info(`enabling all buzzers in game ${gameId}`);
    this.socket.to(gameId).emit("buzzer_enabled", {});
    this.socket.emit("buzzer_enabled"); // triggering it to game master
  }

  disableAllBuzzers(message) {
    const { gameId } = message;
    this.logger.info(`disabling all buzzers in game ${gameId}`);
    this.socket.to(gameId).emit("buzzer_disabled", {});
    this.socket.emit("buzzer_disabled"); // triggering it to game master
  }

  enableBuzzer(message) {
    const { gameId, playerId } = message;
    this.logger.info(
      `enabling buzzer for player ${playerId} in game ${gameId}`,
    );
    this.socket.to(gameId).emit("buzzer_enabled", message);
  }

  disableBuzzer(message) {
    const { gameId, playerId } = message;
    this.logger.info(
      `disabling buzzer for player ${playerId} in game ${gameId}`,
    );
    this.socket.to(gameId).emit("buzzer_disabled", message);
  }
}

export default BuzzerChannel;
