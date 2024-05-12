import BaseChannel from "./BaseChannel.js";

class GameSequenceChannel extends BaseChannel {
  listen() {
    this.socket.on("new-sequence", (message) => {
      const { gameId, sequenceType, sequenceName } = message;

      this.socket.to(gameId).emit("render-sequence", {
        sequenceAnimationComponent: "NewQuestionSequence",
        videoUrl: `https://skap-assets.us-sea-1.linodeobjects.com/${sequenceType}/${sequenceName}.mp4`,
      });
    });
  }
}

export default GameSequenceChannel;
