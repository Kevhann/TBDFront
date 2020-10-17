import { Color } from './typings/types';

const turbulate = (x: number, y: number, rounds: number, map: number[][]) => {
  const smoothingRounds = rounds;
  let value = 0.0;
  let size = smoothingRounds;

  while (size >= 1) {
    value += smoothNoise(x / size, y / size, map) * size;
    size /= 2;
  }

  return value / smoothingRounds / 2;
};

const smoothNoise = (x: number, y: number, map: number[][]) => {
  const width: number = map[0].length;
  const height: number = map.length;

  //get fractional part of x and y
  let fractX = x - Math.floor(x);
  let fractY = y - Math.floor(y);

  //wrap around
  const x1 = (Math.floor(x) + width) % width;
  const y1 = (Math.floor(y) + height) % height;

  //neighbor values
  const x2 = (x1 + width - 1) % width;
  const y2 = (y1 + height - 1) % height;

  //smooth the noise with bilinear interpolation
  let value = 0;
  value += fractX * fractY * map[y1][x1];
  value += (1 - fractX) * fractY * map[y1][x2];
  value += fractX * (1 - fractY) * map[y2][x1];
  value += (1 - fractX) * (1 - fractY) * map[y2][x2];
  return value;
};

export const randomNoise = (width: number, height: number): number[][] =>
  Array(height)
    .fill(0)
    .map(_i =>
      Array(width)
        .fill(0)
        .map(_j => Math.random())
    );

export const turbulatedColor = (width: number, height: number, rounds = 3) => {
  const turbulatedMap: Color[][] = Array(height)
    .fill(0)
    .map(_i => Array(width).fill(0));

  const map = randomNoise(width, height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const value = turbulate(i, j, rounds, map);

      turbulatedMap[i][j] = { red: value, green: value, blue: value };
    }
  }

  return turbulatedMap;
};

export const turbulatedBW = (width: number, height: number, rounds: number) => {
  console.log('width:', width);
  console.log('height:', height);
  const turbulatedMap: number[][] = Array(height)
    .fill(0)
    .map(_i => Array(width).fill(0));

  const map = randomNoise(width, height);
  console.log('turbulatedMap:', turbulatedMap);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const value = turbulate(i, j, rounds, map);

      turbulatedMap[i][j] = value;
    }
  }

  return turbulatedMap;
};

export class TerrainGenerator {
  private width: number;
  private height: number;
  // private unit: number;
  // private roughness: number;
  private map: number[][];
  // private smoothingSize: number;

  constructor(mapWidth = 256, mapHeight = 256) {
    // this.roughness = Math.pow(2, roughness);
    // this.smoothingSize = smoothingSize;
    this.width = mapWidth;
    this.height = mapHeight;
    this.map = Array(this.height)
      .fill(0)
      .map(_i => Array(this.width).fill(0));
  }

  grainy = (granularity = 8) => {
    const grainyMap: number[][] = Array(this.height)
      .fill(0)
      .map(_i => Array(this.width).fill(0));

    this.randomNoise();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        grainyMap[i][j] = this.map[Math.floor(i / granularity)][Math.floor(j / granularity)];
      }
    }
    return grainyMap;
  };

  noise = () => {
    this.randomNoise();
    return this.map;
  };

  smoothed = (smoothing = 2) => {
    const smoothMap: number[][] = Array(this.height)
      .fill(0)
      .map(_i => Array(this.width).fill(0));

    const scaled = Math.pow(2, smoothing);
    this.randomNoise();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        smoothMap[i][j] = this.smoothNoise(i / smoothing, j / smoothing);
      }
    }
    return smoothMap;
  };

  turbulated = (rounds = 3) => {
    const turbulatedMap: Color[][] = Array(this.height)
      .fill(0)
      .map(_i => Array(this.width).fill(0));

    this.randomNoise();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const value = this.turbulate(i, j, rounds);

        turbulatedMap[i][j] = { red: value, green: 123, blue: value };
      }
    }

    return turbulatedMap;
  };

  private randomNoise = () => {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.map[i][j] = Math.random();
      }
    }
  };

  private smoothNoise = (x: number, y: number) => {
    //get fractional part of x and y
    let fractX = x - Math.floor(x);
    let fractY = y - Math.floor(y);

    //wrap around
    const x1 = (Math.floor(x) + this.width) % this.width;
    const y1 = (Math.floor(y) + this.height) % this.height;

    //neighbor values
    const x2 = (x1 + this.width - 1) % this.width;
    const y2 = (y1 + this.height - 1) % this.height;

    //smooth the noise with bilinear interpolation
    let value = 0;
    value += fractX * fractY * this.map[y1][x1];
    value += (1 - fractX) * fractY * this.map[y1][x2];
    value += fractX * (1 - fractY) * this.map[y2][x1];
    value += (1 - fractX) * (1 - fractY) * this.map[y2][x2];
    return value;
  };

  private turbulate = (x: number, y: number, rounds: number) => {
    const smoothingRounds = rounds;
    let value = 0.0;
    let size = smoothingRounds;

    while (size >= 1) {
      value += this.smoothNoise(x / size, y / size) * size;
      size /= 2;
    }

    return value / smoothingRounds / 2;
  };
}
