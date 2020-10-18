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

type Props = { bitMap: BitMap };

export const Canvas = ({ bitMap }: Props) => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  const dimension = bitMap.length;
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

    bitMap.forEach((row, j) => {
      row.forEach((pixel, i) => {
        ctx.fillStyle = colorBW(pixel);
        ctx.fillRect(i * block, j * block, i * block + block, i * block + block);
      });
    });
  }, [bitMap]);

  return (
    <>
      <canvas id="canvas" ref={ref} height={dimension} width={dimension}></canvas>
    </>
  );
};
