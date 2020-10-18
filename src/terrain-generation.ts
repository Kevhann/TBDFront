import { BitMap } from './typings/types';

const random = () => Math.floor(Math.random() * 256);

// Random function to offset the center
const displace = (dimension: number, amount: number, roughness: number) => {
  const max = (amount / (dimension * 2)) * roughness;
  return (random() - 128) * max;
};

// Normalize the value to make sure its within bounds
const normalize = (value: number) => {
  return Math.max(Math.min(value, 255), 0);
  // return value;
};

const midpointDisplacment = (map: BitMap, size: number, roughness: number) => {
  let plot = size;

  while (plot > 1) {
    for (let i = plot; i <= size; i += plot) {
      for (let j = plot; j <= size; j += plot) {
        const half = Math.floor(plot / 2);
        const x = i - half;
        const y = j - half;

        const topLeft = map[i - plot][j - plot];
        const topRight = map[i][j - plot];
        const bottomLeft = map[i - plot][j];
        const bottomRight = map[i][j];

        // Center
        map[x][y] = normalize(
          (topLeft + topRight + bottomLeft + bottomRight) / 4 + displace(size, plot, roughness)
        );

        const center = map[x][y];

        // Top
        const top = topLeft + topRight + center;

        if (j > plot) {
          map[x][j - plot] = (top + map[x][j - half]) / 4 + displace(size, plot, roughness);
        } else {
          map[x][j - plot] = top / 3 + displace(size, plot, roughness);
        }

        map[x][j - plot] = normalize(map[x][j - plot]);

        // Bottom
        const bottom = bottomLeft + bottomRight + center;

        if (j < plot) {
          map[x][j] = (bottom + map[x][j + half]) / 4 + displace(size, plot, roughness);
        } else {
          map[x][j] = bottom / 3 + displace(size, plot, roughness);
        }

        map[x][j] = normalize(map[x][j]);

        //Right
        const right = topRight + bottomRight + center;

        if (i < plot) {
          map[i][y] = (right + map[i + half][y]) / 4 + displace(size, plot, roughness);
        } else {
          map[i][y] = right / 3 + displace(size, plot, roughness);
        }

        map[i][y] = normalize(map[i][y]);

        // Left
        const left = topLeft + bottomLeft + center;

        if (i > plot) {
          map[i - plot][y] = (left + map[i - half][y]) / 4 + displace(size, plot, roughness);
        } else {
          map[i - plot][y] = left / 3 + displace(size, plot, roughness);
        }

        map[i - plot][y] = normalize(map[i - plot][y]);
      }
    }
    plot = Math.floor(plot / 2);
  }
};

// Starts off the map generation, seeds the first 4 corners
export const generateSmooth = (size: number, roughness: number) => {
  const map = Array(size + 1)
    .fill(0)
    .map(_a =>
      Array(size + 1)
        .fill(0)
        .map(_b => random())
    );

  // top left
  map[0][0] = random();

  // bottom left
  map[0][size] = random();

  // top right
  map[size][0] = random();

  // bottom right
  map[size][size] = random();

  // Center
  // map[size / 2][size / 2] = normalize(
  //   map[0][0] + map[0][size] + map[size][0] + map[size][size] / 4
  // );

  const half = Math.floor(size / 2);
  map[half][half] = random();

  midpointDisplacment(map, size, roughness);
  return map;
};

export class TerrainGenerator {
  private mapDimension: number;
  private unitSize: number;
  private roughness: number;
  private map: BitMap;

  constructor(mapDimension = 256, unitSize = 1, roughness = 8) {
    this.mapDimension = mapDimension;
    this.unitSize = unitSize;
    this.roughness = roughness;

    this.map = Array(mapDimension + 1).fill(Array(mapDimension + 1).fill(0));
  }

  // Starts off the map generation, seeds the first 4 corners
  generate = () => {
    const { map, mapDimension } = this;

    // top left
    map[0][0] = Math.random();

    // bottom left
    map[0][mapDimension] = Math.random();

    // top right
    map[mapDimension][0] = Math.random();

    // bottom right
    map[mapDimension][mapDimension] = Math.random();

    // Center
    map[mapDimension / 2][mapDimension / 2] =
      map[0][0] + map[0][mapDimension] + map[mapDimension][0] + map[mapDimension][mapDimension] / 4;
    map[mapDimension / 2][mapDimension / 2] = this.normalize(
      map[mapDimension / 2][mapDimension / 2]
    );

    this.midpointDisplacment(mapDimension);
    return this.map;
  };

  private midpointDisplacment = (plot: number) => {
    const { map, mapDimension, unitSize } = this;

    const subPlot = plot / 2;

    if (subPlot > unitSize) {
      for (let i = subPlot; i <= mapDimension; i += subPlot) {
        for (let j = subPlot; j <= mapDimension; j += subPlot) {
          const x = i - subPlot / 2;
          const y = j - subPlot / 2;

          const topLeft = map[i - subPlot][j - subPlot];
          const topRight = map[i][j - subPlot];
          const bottomLeft = map[i - subPlot][j];
          const bottomRight = map[i][j];

          // Center
          map[x][y] = (topLeft + topRight + bottomLeft + bottomRight) / 4 + this.displace(plot);
          map[x][y] = this.normalize(map[x][y]);

          const center = map[x][y];

          // Top
          const top = topLeft + topRight + center;

          if (j > subPlot) {
            map[x][j - subPlot] = (top + map[x][j - plot + subPlot / 2]) / 4 + this.displace(plot);
          } else {
            map[x][j - subPlot] = top / 3 + this.displace(plot);
          }

          map[x][j - subPlot] = this.normalize(map[x][j - subPlot]);

          // Bottom
          const bottom = bottomLeft + bottomRight + center;

          if (j < mapDimension) {
            map[x][j] = (bottom + map[x][j + subPlot / 2]) / 4 + this.displace(plot);
          } else {
            map[x][j] = bottom / 3 + this.displace(plot);
          }

          map[x][j] = this.normalize(map[x][j]);

          //Right
          const right = topRight + bottomRight + center;

          if (i < mapDimension) {
            map[i][y] = (right + map[i + subPlot / 2][y]) / 4 + this.displace(plot);
          } else {
            map[i][y] = right / 3 + this.displace(plot);
          }

          map[i][y] = this.normalize(map[i][y]);

          // Left
          const left = topLeft + bottomLeft + center;

          if (i > subPlot) {
            map[i - subPlot][y] = (left + map[i - plot + subPlot / 2][y]) / 4 + this.displace(plot);
          } else {
            map[i - subPlot][y] = left / 3 + this.displace(plot);
          }

          map[i - subPlot][y] = this.normalize(map[i - subPlot][y]);
        }
      }

      this.midpointDisplacment(subPlot);
    }
  };

  // Random function to offset the center
  private displace = (amount: number) => {
    const { mapDimension, roughness } = this;
    const max = (amount / (mapDimension * 2)) * roughness;
    return (Math.random() - 0.5) * max;
  };

  // Normalize the value to make sure its within bounds
  private normalize = (value: number) => {
    return Math.max(Math.min(value, 1), 0);
  };
}
