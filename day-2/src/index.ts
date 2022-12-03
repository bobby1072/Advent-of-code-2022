const fs = require("fs");
const readLine = require("readline");
interface IMove {
  name: string;
  points: number;
  effectiveAgainst: string;
  weakAgainst: string;
}

function main(): number {
  const rock: IMove = {
    name: "rock",
    points: 1,
    effectiveAgainst: "scissors",
    weakAgainst: "paper",
  };
  const paper: IMove = {
    name: "paper",
    points: 2,
    effectiveAgainst: "rock",
    weakAgainst: "scissors",
  };
  const scissors: IMove = {
    name: "scissors",
    points: 3,
    effectiveAgainst: "paper",
    weakAgainst: "rock",
  };
  const rpsObjP1: Map<string, IMove> = new Map<string, IMove>();
  rpsObjP1.set("A", rock);
  rpsObjP1.set("B", paper);
  rpsObjP1.set("C", scissors);
  const rpsObjP2: Map<string, string> = new Map<string, string>();
  rpsObjP2.set("X", "lose");
  rpsObjP2.set("Y", "draw");
  rpsObjP2.set("Z", "win");
  const nameMap: Map<string, IMove> = new Map();
  nameMap.set("rock", rock);
  nameMap.set("paper", paper);
  nameMap.set("scissors", scissors);
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  let p2Score: number = 0;
  allFileContents.split(/\r?\n/).forEach((line: string) => {
    if (line) {
      const lineSplit = line.split(" ");
      const p1Move = rpsObjP1.get(lineSplit[0]);
      const p2Move = rpsObjP2.get(lineSplit[1]);
      let p2MoveF: any = {};
      if (p2Move === "lose") {
        p2MoveF = nameMap.get(p1Move!.effectiveAgainst);
      } else if (p2Move === "draw") {
        p2MoveF = nameMap.get(p1Move!.name);
      } else if (p2Move === "win") {
        p2MoveF = nameMap.get(p1Move!.weakAgainst);
      }
      if (p1Move?.name === p2MoveF?.name) {
        p2Score = p2Score + p2MoveF!.points + 3;
      } else if (p1Move?.name === p2MoveF?.weakAgainst) {
        p2Score = p2Score + p2MoveF!.points;
      } else if (p1Move?.name === p2MoveF?.effectiveAgainst) {
        p2Score = p2Score + p2MoveF!.points + 6;
      }
    }
  });
  return p2Score;
}
console.log(main());
