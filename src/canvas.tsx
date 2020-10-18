import * as React from 'react';
import { BitMap, Color, Config } from './typings/types';

const colorString = (pixel: Color) => {
  const red = Math.floor(pixel.red * 255);
  const green = Math.floor(pixel.green * 255);
  const blue = Math.floor(pixel.blue * 255);
  return `rgb(${red},${green},${blue})`;
};

const colorBW = (pixel: number) => {
  const value = Math.floor(pixel * 255);
  return `rgb(${value},${value},${value})`;
};

type Props = { map: BitMap };

export const Canvas = ({ map }: Props) => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  const dimension = map.length;
  console.log('dimension:', dimension);

  const block = 1;

  React.useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      console.log('canvas missing');

      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.log('context missing');
      return;
    }

    map.forEach((row, j) => {
      row.forEach((pixel, i) => {
        ctx.fillStyle = colorBW(pixel);
        ctx.fillRect(i * block, j * block, i * block + block, i * block + block);
      });
    });
  }, [map]);

  return (
    <>
      <canvas id="canvas" ref={ref} height={dimension} width={dimension}></canvas>
    </>
  );
};
