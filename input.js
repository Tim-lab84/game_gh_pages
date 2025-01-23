//capture and keep track of user inputs
export class InputHandler {
  constructor(game) {
    this.game = game;
    //contains all active keys
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      //key just pressed has value of key and is not yet included in the keys array
      // (-1 = not present in array)
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Enter") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
        //Debug mode to show hitboxes
      } else if (e.key === "d") this.game.debug = !this.game.debug;
      console.log(e.key, this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });
  }
}
