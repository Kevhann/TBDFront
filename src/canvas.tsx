import * as React from 'react';
import { gaussian } from './blurs/gaussian';
import { randomNoise, turbulatedBW } from './terrain';
import { generate } from './terrain-generation';
import { Color, Config } from './typings/types';

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

type Props = { config: Config; map: number[][] };

export const Canvas = (props: Props) => {
  const { dimension, roughness } = props.config;

  const ref = React.useRef<HTMLCanvasElement>(null);
  const block = 1;

  React.useEffect(() => {
    // const debounced = () => {
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

    props.map.forEach((row, j) => {
      row.forEach((pixel, i) => {
        ctx.fillStyle = colorBW(pixel);
        ctx.fillRect(i * block, j * block, i * block + block, i * block + block);
      });
    });
    // };
    // const wait = setTimeout(debounced, 1000);
    // return () => clearTimeout(wait);
  }, [props.map]);

  return (
    <>
      <canvas ref={ref} height={dimension} width={dimension}></canvas>
    </>
  );
};
