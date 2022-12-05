const fs = require("fs");
function findRedundantAssignmentPairsP1(): number {
  const allFileContents = fs.readFileSync("src/data.txt", "utf-8");
  class ElfRanges {
    public readonly numberRange: number[];
    constructor(stringRange: string) {
      const startEndArray: number[] = stringRange
        .split("-")
        .map((startEndRangeNum: string) => {
          return Number(startEndRangeNum);
        });
      const rangeArray: number[] = [];
      if (startEndArray[0] === startEndArray[1]) {
        this.numberRange = [startEndArray[0]];
        return this;
      } else if (startEndArray.length === 2) {
        for (let i = startEndArray[0]; i < startEndArray[1] + 1; i++) {
          rangeArray.push(i);
        }
      }

      this.numberRange = rangeArray;
    }
    public checkOverLap(partner: ElfRanges): boolean {
      if (
        (partner.numberRange[0] <= this.numberRange[0] &&
          partner.numberRange[partner.numberRange.length - 1] >=
            this.numberRange[this.numberRange.length - 1]) ||
        (this.numberRange[0] <= partner.numberRange[0] &&
          this.numberRange[this.numberRange.length - 1] >=
            partner.numberRange[partner.numberRange.length - 1])
      )
        return true;
      return false;
    }
  }
  const pairNumberRanges: ElfRanges[][] = [];
  allFileContents.split(/\r?\n/).forEach((element: string) => {
    const pairsArr: string[] = element.split(",");
    const elfRangePair: ElfRanges[] = [];
    pairsArr.forEach((pairElement: string) => {
      elfRangePair.push(new ElfRanges(pairElement));
    });
    pairNumberRanges.push(elfRangePair);
  });
  let overLapFinalCount = 0;
  pairNumberRanges.forEach((element: ElfRanges[]) => {
    if (element[0].checkOverLap(element[1]))
      overLapFinalCount = overLapFinalCount + 1;
  });
  return overLapFinalCount;
}
console.log(findRedundantAssignmentPairsP1());
