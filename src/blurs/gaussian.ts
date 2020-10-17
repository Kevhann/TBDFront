export const gaussian = (map: number[][], sd: number, range = 3) => {
  const size = map.length;
  const first = Array(size + 1)
    .fill(0)
    .map(_a => Array(size + 1).fill(0));

  const res = Array(size + 1)
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

  // Blur vertical with wrap-around
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let value = 0;
      for (let k = -range; k <= range; k++) {
        const index = (j + k + size) % size;
        value += convolution[k + range] * map[index][i];
      }

      first[j][i] = value;
    }
  }

  // Blur horizontal with wrap-around
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let value = 0;
      for (let k = -range; k <= range; k++) {
        const index = (j + k + size) % size;
        value += convolution[k + range] * first[i][index];
      }

      res[j][i] = value;
    }
  }

  return res;
};
