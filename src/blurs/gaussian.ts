import { BitMap } from '../typings/types';

export const gaussian = (map: BitMap, sd: number, range = 3) => {
  const size = map.length - 1;
  const first: BitMap = Array(size + 1)
    .fill(0)
    .map(_a => Array(size + 1).fill(0));

  const res: BitMap = Array(size + 1)
    .fill(0)
    .map(_a => Array(size + 1).fill(0));

  //   calculate the convolution 'matrix'

  const convolution = Array(2 * range + 1).fill(0);
  const coefficient = 1 / Math.sqrt(2 * Math.PI * sd * sd);
  convolution[range] = coefficient;
  for (let i = 1; i <= range; i++) {
    const product = coefficient * Math.pow(Math.E, (-i * i) / (2 * sd * sd));
    convolution[range - i] = product;
    convolution[range + i] = product;
  }

  const sum = convolution.reduce((acc, curr) => acc + curr, 0);

  // Blur vertical with wrap-around
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      let value = 0;
      for (let k = -range; k <= range; k++) {
        const index = (j + k + size) % size;
        value += convolution[k + range] * map[index][i];
      }

      first[j][i] = value / sum;
    }
  }

  // Blur horizontal with wrap-around
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      let value = 0;
      for (let k = -range; k <= range; k++) {
        const index = (j + k + size) % size;
        value += convolution[k + range] * first[i][index];
      }

      res[i][j] = value / sum;
    }
  }

  return res;
};
