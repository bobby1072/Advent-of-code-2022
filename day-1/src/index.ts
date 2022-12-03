const readLine = require("readline");
const fs = require("fs");
class Elf {
  public calories?: number;
  public addCalCount(x: number): void {
    if (this.calories) this.calories = this.calories + x;
    else this.calories = x;
  }
}
interface IScoreElf {
  index: number;
  highScore: number;
}
function getElfHighestCalCount(): number {
  function findHighScore(elfList: Elf[]): [IScoreElf, Elf[]] {
    let highScore: IScoreElf = { highScore: 0, index: 0 };
    elfList.forEach((ele: Elf, index: number): void => {
      if (ele.calories && ele.calories > highScore.highScore) {
        highScore.highScore = ele.calories;
        highScore.index = index;
      }
    });
    return [
      highScore,
      elfList.filter((el: Elf, index: number) => {
        return index !== highScore.index;
      }),
    ];
  }
  const elfList: Elf[] = [];
  const allFileContents = fs.readFileSync("src/test.txt", "utf-8");
  allFileContents.split(/\r?\n/).forEach((line: string) => {
    if (line) {
      if (elfList.length === 0) {
        elfList.push(new Elf());
      }
      elfList[elfList.length - 1].addCalCount(Number(line));
    } else {
      elfList.push(new Elf());
    }
  });
  const [number1Elf, freshList] = findHighScore(elfList);
  const [number2Elf, fresherList] = findHighScore(freshList);
  const [number3Elf, freshestList] = findHighScore(fresherList);
  return number1Elf.highScore + number2Elf.highScore + number3Elf.highScore;
}
console.log(getElfHighestCalCount());
