import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { gaussian } from './blurs/gaussian';
import { Canvas } from './canvas';
import { FormBase } from './components/form-base';
import { randomNoise, turbulatedBW } from './terrain';
import { generateSmooth } from './terrain-generation';
import { BitMap, Config } from './typings/types';

const initial: Config = {
  creation: {
    dimension: 512,
    roughness: 1,
    mode: 'random'
  },
  modification: { mode: 'gaussian', range: 3, standardDeviation: 2 }
};

export const App = () => {
  const [config, setConfig] = React.useState<Config>(initial);
  const [bitMap, setBitMap] = React.useState<BitMap>(
    randomNoise(initial.creation.dimension, initial.creation.dimension)
  );

  const create = () => {
    const creationConfig = config.creation;

    switch (creationConfig.mode) {
      case 'neighbour': {
        setBitMap(turbulatedBW(bitMap, creationConfig.roughness));
        break;
      }
      case 'random': {
        setBitMap(randomNoise(creationConfig.dimension, creationConfig.dimension));

        break;
      }
      case 'smooth': {
        setBitMap(generateSmooth(creationConfig.dimension, creationConfig.roughness));
        break;
      }
      default: {
      }
    }
  };

  const modify = () => {
    const modificationConfig = config.modification;

    switch (modificationConfig.mode) {
      case 'gaussian': {
        setBitMap(gaussian(bitMap, modificationConfig.standardDeviation, modificationConfig.range));
        break;
      }
      default: {
      }
    }
  };

  return (
    <Container style={{ marginTop: '15px' }}>
      <FormBase config={config} onChange={setConfig} create={create} modify={modify} />
      <Canvas bitMap={bitMap} />
    </Container>
  );
};
