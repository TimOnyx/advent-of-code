
export interface IMap {
  setSymbolPosition(x: number, y: number): void;
  setNumberPosition(x: number, xEnd: number, y: number, value: number): void;
  isPart(xPos: number, xPosEnd: number, yPos: number): boolean;
  isGear(xPos: number, yPos: number): false | number[];
}

interface MapValue {
  value: boolean | number;
  xEndPos: number;
}

type MapInstance = MapValue[][];

export class Map implements IMap {
  private symbolMap: MapInstance = [];
  private numberMap: MapInstance = [];

  public setSymbolPosition(x: number, y: number): void {
    if (!this.symbolMap[y]) {
      this.symbolMap[y] = [];
    }

    this.symbolMap[y][x] = { value: true, xEndPos: x};
  }

  public setNumberPosition(x: number, xEnd: number, y: number, value: number): void {
    if (!this.numberMap[y]) {
      this.numberMap[y] = [];
    }

    for(let i = x; i <= xEnd; i++) {
      this.numberMap[y][i] = { value, xEndPos: xEnd };
    }
  }

  private getAdjecentValues(map: MapInstance, xPos: number, xPosEnd: number, yPos: number): any[] {
    const adjecentValues: (number | boolean)[] = [];
    // Left
    const leftvalue = map[yPos]?.[xPos - 1];
    if (leftvalue) {
      adjecentValues.push(leftvalue.value);
    }

    // Right
    const rightvalue = map[yPos]?.[xPosEnd + 1];
    if (rightvalue) {
      adjecentValues.push(rightvalue.value);
    }

    // Top
    for(let i = xPos -1; i <= xPosEnd + 1; i++) {
      const topValue = map[yPos - 1]?.[i];
      if (topValue) {
        adjecentValues.push(topValue.value);
        i = topValue.xEndPos;
      }
    }

    // Bottom
    for(let i = xPos -1; i <= xPosEnd + 1; i++) {
      const bottomValue = map[yPos + 1]?.[i];
      if (bottomValue) {
        adjecentValues.push(bottomValue.value);
        i = bottomValue.xEndPos;
      }
    }

    return adjecentValues;
  }

  public isPart(xPos: number, xPosEnd: number, yPos: number): boolean {
    return this.getAdjecentValues(this.symbolMap, xPos, xPosEnd, yPos).length > 0;
  }

  public isGear(xPos: number, yPos: number): false | number[] {
    const adjecentValues: number[] = this.getAdjecentValues(this.numberMap, xPos, xPos, yPos);
    if (adjecentValues.length !== 2) {
      return false;
    }

    return adjecentValues;
  }
}
