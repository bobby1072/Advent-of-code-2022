const readLine = require("readline");
const fs = require("fs");
interface IAlphaPriority {
  readonly char: string;
  readonly points: number;
}
function sortRucksP1(): number {
  function split(str: string, index: number): string[] {
    const result: string[] = [str.slice(0, index), str.slice(index)];
    return result;
  }
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArr: string = `${alphabet}${alphabet.toUpperCase()}`;
  const alphabetPriority: IAlphaPriority[] = alphabetArr
    .split("")
    .map((element: string, index: number) => {
      return { char: element, points: index + 1 };
    });
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  let finalCommonItemPrioSum: number = 0;
  allFileContents.split(/\r?\n/).forEach((ruckSack: string) => {
    const [compart1, compart2] = split(ruckSack, ruckSack.length / 2);
    const commonItem: string =
      compart1.split("").find((element: string) => {
        if (compart2.includes(element)) return element;
      }) ?? "";
    finalCommonItemPrioSum =
      finalCommonItemPrioSum +
      alphabetPriority.find((element) => element.char === commonItem)!.points;
  });
  return finalCommonItemPrioSum;
}
function sortRucksP2(): number {
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArr: string = `${alphabet}${alphabet.toUpperCase()}`;
  const alphabetPriority: IAlphaPriority[] = alphabetArr
    .split("")
    .map((element: string, index: number) => {
      return { char: element, points: index + 1 };
    });
  class ElfGroup implements IAlphaPriority {
    public readonly char: string;
    public readonly points: number;
    public constructor(rucks: [string, string, string]) {
      this.char =
        rucks[0].split("").find((element: string) => {
          if (rucks[1].includes(element) && rucks[2].includes(element))
            return element;
        }) ?? "";
      this.points = alphabetPriority.find((element: IAlphaPriority) => {
        return element.char === this.char;
      })!.points;
    }
  }
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  const elfGroupArr: ElfGroup[] = [];
  const allFileLines: string[] = allFileContents.split(/\r?\n/);
  allFileLines.forEach((ruckSack: string, index: number) => {
    if ((index + 1) % 3 === 0) {
      elfGroupArr.push(
        new ElfGroup([
          ruckSack,
          allFileLines[index - 1],
          allFileLines[index - 2],
        ])
      );
    }
  });
  let finalCommonGroupPrioSum: number = 0;
  elfGroupArr.forEach((element: ElfGroup) => {
    finalCommonGroupPrioSum = finalCommonGroupPrioSum + element.points;
  });
  return finalCommonGroupPrioSum;
}
console.log(sortRucksP1());
console.log(sortRucksP2());
