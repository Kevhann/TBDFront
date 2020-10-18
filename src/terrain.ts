import { BitMap, Color } from './typings/types';

const random = () => Math.floor(Math.random() * 256);
const turbulate = (x: number, y: number, rounds: number, map: BitMap) => {
  const smoothingRounds = rounds;
  let value = 0.0;
  let size = smoothingRounds;

  while (size >= 1) {
    value += smoothNoise(x / size, y / size, map) * size;
    size /= 2;
  }

  return value / smoothingRounds / 2;
};

const smoothNoise = (x: number, y: number, map: BitMap) => {
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

export const randomNoise = (width: number, height: number): BitMap =>
  Array(height)
    .fill(0)
    .map(_i =>
      Array(width)
        .fill(0)
        .map(_j => random())
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

export const turbulatedBW = (map: BitMap, rounds: number) => {
  const dimension = map.length;

  const turbulatedMap: BitMap = Array(dimension)
    .fill(0)
    .map(_i => Array(dimension).fill(0));

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      const value = turbulate(i, j, rounds, map);

      turbulatedMap[i][j] = value;
    }
  }

  return turbulatedMap;
};
