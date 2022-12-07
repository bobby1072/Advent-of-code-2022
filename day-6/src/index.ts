const fs = require("fs");
function mySplice(array: any[], indexToRemove: number): [(any | null)[], any] {
  const removedElement = array.splice(indexToRemove, 1);
  return [array, removedElement];
}
function day6P1(): number {
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  let patternOf4 = "";
  let startMarker = 3;
  const dataArray: string[] = allFileContents.split("");
  let i = 4;
  while (i < dataArray.length - 1) {
    patternOf4 = `${allFileContents.substring(i - 4, i)}`;
    if (new Set(patternOf4.split("")).size === 4) {
      startMarker = i;
      break;
    }
    i = i + 1;
  }
  return startMarker;
}
function day6P2(): number {
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  let patternOf4 = "";
  let startMarker = 13;
  const dataArray: string[] = allFileContents.split("");
  let i = 14;
  while (i < dataArray.length - 1) {
    patternOf4 = `${allFileContents.substring(i - 14, i)}`;
    if (new Set(patternOf4.split("")).size === 14) {
      startMarker = i;
      break;
    }
    i = i + 1;
  }
  return startMarker;
}
console.log(day6P1());
console.log(day6P2());
